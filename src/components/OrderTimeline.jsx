export default function OrderTimeline({ status }) {

  const steps = ["Pending", "Processing", "Delivered"];

  const currentStep = steps.indexOf(status);

  return (
    <div className="flex items-center justify-between mt-6 relative">

      {steps.map((step, index) => {

        const isActive = index <= currentStep;

        return (
          <div key={step} className="flex-1 text-center relative">

            {/* Line */}
            {index !== steps.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 w-full h-1 ${
                  index < currentStep ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}

            {/* Circle */}
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white z-10 relative ${
                isActive ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              {index + 1}
            </div>

            <p className="text-sm mt-2">{step}</p>
          </div>
        );
      })}

    </div>
  );
}