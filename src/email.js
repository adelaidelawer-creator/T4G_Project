/* =========================================
   AL LUXE EMAIL NOTIFICATION SYSTEM
========================================= */

/* =========================================
   EMAILJS CONFIGURATION
========================================= */

const EMAILJS_PUBLIC_KEY = "FhcH6rXg1PTbPwEz_";
const EMAILJS_SERVICE_ID = "service_ivm5hdo";
const EMAILJS_ORDER_TEMPLATE_ID = "template_2sr7d98";
const EMAILJS_WELCOME_TEMPLATE_ID = "template_ypu785s";


/* =========================================
   INITIALIZE EMAILJS
========================================= */

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

} else {

    console.error("EmailJS library has not been loaded.");

}


/* =========================================
   SEND ORDER EMAIL
========================================= */

async function sendOrderEmail(order) {

    if (typeof emailjs === "undefined") {

        console.error(
            "EmailJS library has not been loaded."
        );

        return false;
    }


    const customer = order?.customer || {};
    const products = order?.products || [];


    /* =========================================
       FORMAT ORDER ITEMS
    ========================================= */

    const orderItems = products
        .map(function (item) {

            const price =
                Number(item.price || 0);

            const quantity =
                Number(item.quantity || 0);

            const itemTotal =
                price * quantity;

            return (
                `${item.name} | ` +
                `Qty: ${quantity} | ` +
                `GH₵${itemTotal.toFixed(2)}`
            );

        })
        .join("\n");


    /* =========================================
       PREPARE EMAIL DATA
    ========================================= */

    const templateParams = {

        order_id:
            order?.orderNumber || "N/A",

        customer_name:
            customer.fullName || "Customer",

        email:
            customer.email || "",

        phone:
            customer.phone || "Not provided",

        region:
            customer.region || "Not provided",

        city:
            customer.city || "Not provided",

        address:
            customer.address || "Not provided",

        notes:
            customer.notes ||
            "No additional notes",

        payment_method:
            order?.paymentMethod || "Not provided",

        order_items:
            orderItems || "No items",

        order_total:
            `GH₵${Number(order?.total || 0).toFixed(2)}`

    };


    /* =========================================
       SEND EMAIL
    ========================================= */

    try {

        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_ORDER_TEMPLATE_ID,
            templateParams
        );


        console.log(
            "AL Luxe order email sent successfully."
        );


        return true;


    } catch (error) {

        console.error(
            "AL Luxe EmailJS error:",
            error
        );


        return false;

    }

}


/* =========================================
   AL LUXE PREMIUM MODAL
========================================= */

function showALuxeModal(
    title,
    message,
    buttonText = "Continue",
    callback = null
) {

    /* =========================================
       REMOVE EXISTING MODAL
    ========================================= */

    const existingModal =
        document.querySelector(".aluxe-modal-overlay");

    if (existingModal) {
        existingModal.remove();
    }


    /* =========================================
       CREATE MODAL
    ========================================= */

    const overlay =
        document.createElement("div");

    overlay.className =
        "aluxe-modal-overlay";


    overlay.innerHTML = `

        <div class="aluxe-modal">

            <button
                type="button"
                class="aluxe-modal-close"
                aria-label="Close notification">

                ×

            </button>


            <div class="aluxe-modal-icon">

                <i class="fa-solid fa-check"></i>

            </div>


            <h2>
                ${title}
            </h2>


            <p>
                ${message}
            </p>


            <button
                type="button"
                class="aluxe-modal-button">

                ${buttonText}

            </button>

        </div>

    `;


    document.body.appendChild(overlay);


    /* =========================================
       SHOW MODAL
    ========================================= */

    setTimeout(function () {

        overlay.classList.add("show");

    }, 10);


    /* =========================================
       MODAL BUTTONS
    ========================================= */

    const closeButton =
        overlay.querySelector(".aluxe-modal-close");

    const actionButton =
        overlay.querySelector(".aluxe-modal-button");


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeModal() {

        overlay.classList.remove("show");

        setTimeout(function () {

            overlay.remove();

        }, 300);

    }


    closeButton.addEventListener(
        "click",
        closeModal
    );


    /* =========================================
       ACTION BUTTON
    ========================================= */

    actionButton.addEventListener(
        "click",
        function () {

            if (callback) {

                callback();

            } else {

                closeModal();

            }

        }
    );


    /* =========================================
       CLICK OUTSIDE MODAL
    ========================================= */

    overlay.addEventListener(
        "click",
        function (event) {

            if (event.target === overlay) {

                closeModal();

            }

        }
    );

}


/* =========================================
   AL LUXE SIGNUP WELCOME EMAIL
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const signupForm =
            document.getElementById("signupForm");


        /* =====================================
           CHECK IF SIGNUP FORM EXISTS
        ===================================== */

        if (!signupForm) {
            return;
        }


        /* =====================================
           SIGNUP FORM SUBMISSION
        ===================================== */

        signupForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* =================================
                   GET FORM VALUES
                ================================= */

                const name =
                    document
                        .getElementById("signupName")
                        .value
                        .trim();


                const email =
                    document
                        .getElementById("signupEmail")
                        .value
                        .trim();


                const phone =
                    document
                        .getElementById("signupPhone")
                        .value
                        .trim();


                const password =
                    document
                        .getElementById("signupPassword")
                        .value;


                const confirmPassword =
                    document
                        .getElementById("confirmPassword")
                        .value;


                /* =================================
                   CHECK PASSWORDS
                ================================= */

                if (password !== confirmPassword) {

                    showALuxeModal(
                        "PASSWORDS DO NOT MATCH",
                        "Please make sure both password fields contain the same password.",
                        "Try Again"
                    );

                    return;

                }


                /* =================================
                   SAVE USER
                ================================= */

                const user = {

                    name: name,

                    email: email,

                    phone: phone

                };


                localStorage.setItem(
                    "alLuxeUser",
                    JSON.stringify(user)
                );


                /* =================================
                   PREPARE WELCOME EMAIL
                ================================= */

                const templateParams = {

                    customer_name:
                        name,

                    email:
                        email

                };


                /* =================================
                   SEND WELCOME EMAIL
                ================================= */

                try {

                    await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_WELCOME_TEMPLATE_ID,
                        templateParams
                    );


                    console.log(
                        "AL Luxe welcome email sent successfully."
                    );


                    /* =============================
                       SUCCESS MODAL
                    ============================= */

                    showALuxeModal(
                        "WELCOME TO AL LUXE",
                        `Your account has been created successfully. A welcome email has been sent to ${email}.`,
                        "Continue",
                        function () {

                            window.location.href =
                                "login.html";

                        }
                    );


                } catch (error) {

                    console.error(
                        "Welcome email failed:",
                        error
                    );


                    /* =============================
                       EMAIL FAILURE MODAL
                    ============================= */

                    showALuxeModal(
                        "ALMOST THERE",
                        "Your account was created, but we couldn't send the welcome email. Please check your connection and try again.",
                        "Continue",
                        function () {

                            window.location.href =
                                "login.html";

                        }
                    );

                }

            }
        );

    }
);

console.log("CUSTOMER EMAIL BEING SENT:", customer.email);
console.log("EMAILJS PARAMETERS:", templateParams);