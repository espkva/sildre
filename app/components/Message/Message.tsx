import { InfoMessageBox } from "@fremtind/jkl-message-box-react";
import { useTimer } from "../../common/useTimer";

export const Message = () => {
  const timer = useTimer(true);

  return (
    <InfoMessageBox>
      Klarer du å dusje raskere enn Pappa Trond?{" "}
      <b>
        {timer.minutes} minutter og {timer.seconds} sekund.
      </b>
    </InfoMessageBox>
  );
};
