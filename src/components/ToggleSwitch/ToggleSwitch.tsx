import cx from "classnames";
import { useCallback, type ReactNode } from "react";

import "./ToggleSwitch.scss";

type Props = {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
};

export default function ToggleSwitch({ isChecked, setIsChecked, className, disabled, children }: Props) {
  const classNames = cx("Switch-toggle-wrapper", className);

  const handleToggle = useCallback(() => {
    if (disabled) {
      return;
    }

    setIsChecked(!isChecked);
  }, [disabled, isChecked, setIsChecked]);

  return (
    <div className={classNames}>
      {children}
      <div className={cx("Switch-toggle", { checked: isChecked, disabled })} onClick={handleToggle}>
        <div className="handle" />
      </div>
    </div>
  );
}
