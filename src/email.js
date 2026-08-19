/* =========================================
   AL LUXE EMAIL NOTIFICATION SYSTEM
========================================= */

const EMAILJS_PUBLIC_KEY = "FhcH6rXg1PTbPwEz_";
const EMAILJS_SERVICE_ID = "service_ivm5hdo";
const EMAILJS_TEMPLATE_ID = "template_2sr7d98";


/* =========================================
   INITIALIZE EMAILJS
========================================= */

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

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


    const customer =
        order.customer || {};


    /* =========================================
       FORMAT ORDER ITEMS
    ========================================= */

    const orderItems =
        (order.products || [])
            .map(function (item) {

                const itemTotal =
                    Number(item.price || 0) *
                    Number(item.quantity || 0);

                return (
                    `${item.name} | ` +
                    `Qty: ${item.quantity} | ` +
                    `GH₵${itemTotal.toFixed(2)}`
                );

            })
            .join("\n");


    /* =========================================
       SEND EMAIL
    ========================================= */

    try {

        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            {

                order_id:
                    order.orderNumber,

                customer_name:
                    customer.fullName,

                email:
                    customer.email,

                phone:
                    customer.phone,

                region:
                    customer.region,

                city:
                    customer.city,

                address:
                    customer.address,

                notes:
                    customer.notes ||
                    "No additional notes",

                payment_method:
                    order.paymentMethod,

                order_items:
                    orderItems,

                order_total:
                    `GH₵${Number(order.total || 0).toFixed(2)}`

            }
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

    /* Remove existing modal */

    const existingModal =
        document.querySelector(".aluxe-modal-overlay");

    if (existingModal) {
        existingModal.remove();
    }


    /* Create modal */

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


    /* Show modal */

    setTimeout(function () {

        overlay.classList.add("show");

    }, 10);


    const closeButton =
        overlay.querySelector(".aluxe-modal-close");

    const actionButton =
        overlay.querySelector(".aluxe-modal-button");


    /* Close modal */

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


    /* Action button */

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


    /* Click outside */

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

document.addEventListener("DOMContentLoaded", function () {

    const signupForm = document.getElementById("signupForm");

    if (!signupForm) {
        return;
    }

    emailjs.init({
        publicKey: "FhcH6rXg1PTbPwEz_"
    });


    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const phone =
            document.getElementById("signupPhone").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        /* =====================================
           CHECK PASSWORDS
        ===================================== */

        if (password !== confirmPassword) {

            showALuxeModal(
    "PASSWORDS DO NOT MATCH",
    "Please make sure both password fields contain the same password.",
    "Try Again"
);
            return;

        }


        /* =====================================
           SAVE USER
        ===================================== */

        const user = {

            name: name,

            email: email,

            phone: phone

        };


        localStorage.setItem(
            "alLuxeUser",
            JSON.stringify(user)
        );


        /* =====================================
           SEND WELCOME EMAIL
        ===================================== */

        const templateParams = {

            customer_name: name,

            email: email

        };


        emailjs.send(
            "service_ivm5hdo",
            "template_ypu785s",
            templateParams
        )

        .then(function () {

            showALuxeModal(
            "WELCOME TO AL LUXE",
            `Your account has been created successfully. A welcome email has been sent to ${email}.`,
            "Continue",
    function () {
        window.location.href = "login.html";
    }
);
            window.location.href = "login.html";

        })

        .catch(function (error) {

            console.error(
                "Welcome email failed:",
                error
            );

           showALuxeModal(
    "ALMOST THERE",
    "Your account was created, but we couldn't send the welcome email. Please check your connection and try again.",
    "Continue",
    function () {
        window.location.href = "login.html";
    }
);
            window.location.href = "login.html";

        });

    });

});