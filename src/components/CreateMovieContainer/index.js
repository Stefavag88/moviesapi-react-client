import React, {useState} from "react";
import { Steps, Button, message } from "antd";
import WrappedNormalLoginForm from "../MovieForm";

const { Step } = Steps;

const CreateMovieContainer = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
  };

  const prev = () => {
    const previousStep = currentStep - 1;
    setCurrentStep(previousStep <= 1 ? 1 : previousStep);
  };

  const steps = [
    {
      title: "Add Movie Info",
      content: <WrappedNormalLoginForm onSuccess={next}/>
    },
    {
      title: "Add Genres Info",
      content: "Second-content"
    },
    {
      title: "Last",
      content: "Last-content"
    }
  ];

  return (
    <div>
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateMovieContainer;
