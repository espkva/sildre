import { useTimer } from "../../common/useTimer";

interface Props {
  active: boolean;
}

export const Timer = ({ active = true }: Props) => {
  const { minutes, seconds } = useTimer(active);

  return (
    <p className="formatted-time">
      {minutes}:{seconds}
    </p>
  );
};
