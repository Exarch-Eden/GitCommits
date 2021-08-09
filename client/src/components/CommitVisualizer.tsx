import React, { FC } from "react";
import { useAppSelector } from "../redux/hooks";
import { selectCommitData } from "../redux/reducers/commitDataSlice";

export interface CommitVisualizerProps {}

const CommitVisualizer: FC<CommitVisualizerProps> = () => {
  const commitData = useAppSelector(selectCommitData);

  return (
    <div className="commitVisualizerContainer">
      {JSON.stringify(commitData)}
    </div>
  );
};

export default CommitVisualizer;
