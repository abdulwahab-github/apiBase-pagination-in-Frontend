import React, { useEffect, useState } from "react";

const PaymentPage = () => {
    const [checkoutId, setCheckoutId] = useState(null);

    // Fetch Checkout ID from the backend
    useEffect(() => {
        const fetchCheckoutId = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/payment", { method: "POST" });
                const data = await response.json();
                setCheckoutId(data.checkoutId);
            } catch (error) {
                console.error("Error fetching checkout ID:", error);
            }
        };

        fetchCheckoutId();
    }, []);

    useEffect(() => {
        if (checkoutId) {
            // Define wpwlOptions before loading the script
            window.wpwlOptions = {
                style: "card",
                locale: "en", // Change to your desired locale
                onReady: function () {
                    console.log("Widget is ready!");
                },
            };

            // Load HyperPay script dynamically
            const script = document.createElement("script");
            script.src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
            script.async = true;  // Ensure script loads asynchronously
            script.onload = () => {
                console.log("HyperPay script loaded successfully");
            };

            document.body.appendChild(script);

            // Cleanup: Remove script when component unmounts
            return () => {
                document.body.removeChild(script);
                delete window.wpwlOptions; // Clean up global scope
            };
        }
    }, [checkoutId]);

    // Handle form submission to prevent page reload
    const handleSubmit = (event) => {
        console.log("Payment form submitted");
        event.preventDefault();
        // You can add additional code to handle the payment submission logic here.
    };
    
    return (
        <div>
            <h1>Payment Page</h1>
            {checkoutId ? (
                <form
                    onSubmit={handleSubmit} 
                    action="#" // Use onSubmit instead of action
                    // action="https://beautyparkbp.com/en" // Use onSubmit instead of action
                    className="paymentWidgets"
                    data-brands="VISA MASTER MADA">
                    {/* Your form content */}
                </form>
            ) : (
                <p>Loading payment widget...</p>
            )}
        </div>
    );
};

export default PaymentPage;
