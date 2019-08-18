import React, {useState} from "react";
import { Steps, Button, message } from "antd";
import WrappedMovieForm from "../MovieForm";
import WrappedGenreForm from "../GenreForm";
import WrappedContribsForm from './../ContribsForm';
import StepsCompletion from './../StepsCompletion';

const { Step } = Steps;

const CreateMovieContainer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [movieId, setMovieId] = useState(null);

  const next = (params) => {
    const nextStep = currentStep + 1;

    if(params && params.movieId)
        setMovieId(params.movieId);

    setCurrentStep(nextStep);
  };

  const prev = () => {
    const previousStep = currentStep - 1;
    setCurrentStep(previousStep <= 1 ? 1 : previousStep);
  };

  const steps = [
    {
      title: "Movie",
      content: <WrappedMovieForm onSuccess={next}/>
    },
    {
      title: "Genres",
      content: <WrappedGenreForm movieId={movieId} onSuccess={next}/>
    },
    {
      title: "Contributors",
      content: <WrappedContribsForm movieId={movieId} onSuccess={next}/>
    },
    {
        title: "Finish",
        content: <StepsCompletion/>
    }
  ];

  return (
    <div className="create-movie-container">
      <Steps current={currentStep}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
    </div>
  );
};

export default CreateMovieContainer;
