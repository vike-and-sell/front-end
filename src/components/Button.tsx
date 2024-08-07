import { Button } from "@chakra-ui/react";

interface DefaultButtonProps {
  title: string;
  clickHandle?: () => void;
  className?: string;
  isDisabled?: boolean;
  isLoading?:boolean
  onKeyDown?: React.KeyboardEventHandler<HTMLButtonElement>;
  datacy?: string;
}

export default function DefaultButton({
  title,
  clickHandle,
  datacy = "default",
}: DefaultButtonProps) {
  return (
    <button
      data-cy={datacy}
      className='bg-pri-blue text-white px-4 py-2 rounded-lg'
      onClick={clickHandle}
    >
      {title}
    </button>
  );
}

export function DefaultFillButton({
  title,
  clickHandle,
  datacy = "default",
}: DefaultButtonProps) {
  return (
    <button
      data-cy={datacy}
      className='bg-pri-blue text-white px-4 py-2 rounded-lg w-full'
      onClick={clickHandle}
    >
      {title}
    </button>
  );
}

export function PriBlueButton({
  title,
  clickHandle,
  className,
  isDisabled,
  isLoading,
  datacy = "default"
}: DefaultButtonProps) {
  return (
    <Button
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      bg='#166aac'
      borderColor='#ccd0d5'
      className={className}
      data-cy={datacy}
      color='#ffffff'
      _focus={{}}
      fontWeight='semibold'
      _hover={{ bg: "#0f4a79" }}
      isLoading={isLoading}
      isDisabled={isDisabled}
      onClick={clickHandle}
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
    >
      {title}
    </Button>
  );
}

export function InverseBlueButton({
  title,
  clickHandle,
  className,
  isDisabled,
  onKeyDown,
  datacy,
}: DefaultButtonProps) {
  return (
    <Button
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      data-cy={datacy}
      bg='#ffffff'
      border='1px'
      borderColor='#166aac'
      className={className}
      color='#166aac'
      _focus={{}}
      fontWeight='semibold'
      _hover={{ bg: "#ccdde9" }}
      isDisabled={isDisabled}
      onClick={clickHandle}
      onKeyDown={onKeyDown}
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
    >
      {title}
    </Button>
  );
}

export function InvalidRedButton({
  title,
  clickHandle,
  className,
  isDisabled,
}: DefaultButtonProps) {
  return (
    <Button
      _active={{
        bg: "#dddfe2",
        transform: "scale(0.98)",
        borderColor: "#bec3c9",
      }}
      bg='#be0f0f'
      borderColor='#ccd0d5'
      className={className}
      color='#ffffff'
      _focus={{}}
      fontWeight='semibold'
      _hover={{ bg: "#8b0a0a" }}
      isDisabled={isDisabled}
      onClick={clickHandle}
      transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
    >
      {title}
    </Button>
  );
}
