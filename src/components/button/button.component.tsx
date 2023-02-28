import {ReactElement, ButtonHTMLAttributes} from "react"
import { BaseButton, InvertedButton } from "./button.style"

export enum BUTTON_TYPES {
  base= "base",
  inverted= "inverted"
}

type ButtonProps = {
  children: ReactElement | string;
  buttonType? : BUTTON_TYPES;
} & ButtonHTMLAttributes<HTMLButtonElement>

function getButton(buttonType = BUTTON_TYPES.base){
  return {
    [BUTTON_TYPES.base] : BaseButton,
    [BUTTON_TYPES.inverted] : InvertedButton
  }[buttonType]
}

function Button({children, buttonType, ...otherProps}: ButtonProps){
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  )
}

export default Button