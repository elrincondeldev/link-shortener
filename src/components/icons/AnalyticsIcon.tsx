import { IconProps } from "../../types";

const AnalyticsIcon: React.FC<IconProps> = ({
  width = "100%",
  height = "100%",
  color = "#fff",
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.7 7.3C21.3 6.9 20.7 6.9 20.3 7.3L14 13.6L9.7 9.3C9.5 9.1 9.3 9 9 9C8.7 9 8.5 9.1 8.3 9.3L2.3 15.3C2.1 15.5 2 15.7 2 16C2 16.6 2.4 17 3 17C3.3 17 3.5 16.9 3.7 16.7L9 11.4L13.3 15.7C13.4 15.8 13.5 15.9 13.6 15.9C13.7 16 13.9 16 14 16C14.2 16 14.5 15.9 14.6 15.7C14.6 15.7 14.6 15.7 14.7 15.7L21.7 8.7C22.1 8.3 22.1 7.7 21.7 7.3Z"
        fill={color}
      />
    </svg>
  );
};

export default AnalyticsIcon;
