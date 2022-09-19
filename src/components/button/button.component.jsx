import { BaseButton, InvertedButton } from "./button.style"

export const BUTTON_TYPES ={
  base: "base",
  inverted: "inverted"
}

function getButton(buttonType = BUTTON_TYPES.base){
  return {
    [BUTTON_TYPES.base] : BaseButton,
    [BUTTON_TYPES.inverted] : InvertedButton
  }[buttonType]
}

function Button({children, buttonType, ...otherProps}){
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton {...otherProps}>
      {children}
    </CustomButton>
  )
}

export default Button