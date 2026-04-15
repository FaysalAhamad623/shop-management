export default function OrderTimeline({ status }) {

  const steps = ["Pending", "Processing", "Delivered"];

  const getIndex = () => steps.indexOf(status);

  return (
    <div className="flex items-center justify-between mt-6">

      {steps.map((step, index) => {
        const active = index <= getIndex();

        return (
          <div key={step} className="flex-1 text-center">

            {/* Circle */}
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white ${
                active ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`h-1 ${
                  index < getIndex()
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            )}

            <p className="text-sm mt-2">{step}</p>
          </div>
        );
      })}

    </div>
  );
}