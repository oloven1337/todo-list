import cn from "classnames";
import styles from "./styles.module.css";

export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...props }) => {
  return (
    <button {...props} className={cn(styles.button, className)}>
      {children}
    </button>
  );
};
