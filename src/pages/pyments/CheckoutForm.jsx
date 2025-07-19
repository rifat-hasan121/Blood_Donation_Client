import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../Api/useAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [amount, setAmount] = useState(500);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navegate = useNavigate();

  // 🔸 Get clientSecret from backend
  useEffect(() => {
    if (amount && parseInt(amount) >= 100) {
      fetch(
        "https://assaingment-12-server-iota.vercel.app/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: parseInt(amount) }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError("Failed to get client secret");
          }
        })
        .catch((err) => {
          console.error("Client secret error:", err);
          setError("Error fetching client secret");
        });
    } else {
      setClientSecret("");
    }
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setProcessing(true);

    if (!stripe || !elements || !clientSecret) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.displayName || "Anonymous",
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const paymentData = {
        name: user?.displayName || "Anonymous",
        email: user?.email,
        amount: parseInt(amount),
        transactionId: paymentIntent.id,
        date: new Date(),
      };

      fetch("https://assaingment-12-server-iota.vercel.app/funds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("✅ Payment Done");
            navegate("/");
          }
        })
        .catch((dbError) => {
          console.error("DB Error:", dbError);
          toast.error("❌ Payment not Done");
        });
    }

    setProcessing(false);
  };

  return (
    <div className="py-24 md:py-48">
      <div className="min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200">
            Payment Info
          </h2>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Amount (in BDT)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
              min={100}
              required
            />
          </div>

          <div className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#98A1BC",
                    fontFamily: "sans-serif",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#ff6b6b",
                  },
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            className={`w-full py-2 px-4 rounded-md text-white font-semibold transition duration-300 ${
              stripe && clientSecret && !processing
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {processing ? "Processing..." : `Pay ৳${amount}`}
          </button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};
