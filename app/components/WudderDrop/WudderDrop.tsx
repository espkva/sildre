interface Props {
  progress: number;
  color?: string;
  scale: number;
}
export const WudderDrop = ({ progress, color = "D9DDFF", scale }: Props) => {
  return (
    <div className="wudderdrop">
      <div
        className="wudderdrop-scale"
        style={{ transform: `scale(${scale})` }}
      >
        <div
          className="wudderdrop-mask"
          style={{ bottom: `${progress}%` }}
        ></div>
        <svg
          width="284"
          height="406"
          viewBox="0 0 284 406"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M241.25 147.109C268.572 197.228 284 236.94 284 263.9H283.996C283.996 342.38 220.422 406 141.998 406C63.5743 406 0 342.382 0 263.9C0 236.938 15.4282 197.226 42.7428 147.109C50.217 133.399 58.4762 119.125 67.3945 104.426C81.9194 80.4878 97.4702 56.5788 113.018 33.8191C118.462 25.8532 123.515 18.5975 128.055 12.1913C130.786 8.33741 132.745 5.61521 133.802 4.16741C137.854 -1.38914 146.14 -1.38914 150.191 4.16741C151.248 5.61521 153.207 8.33741 155.938 12.1913C160.478 18.5973 165.535 25.8531 170.975 33.8191C186.523 56.5788 202.074 80.4869 216.599 104.426C225.516 119.122 233.775 133.399 241.25 147.109Z"
            fill={`#${color}`}
          />
        </svg>
      </div>
    </div>
  );
};
