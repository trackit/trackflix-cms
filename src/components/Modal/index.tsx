import { ReactNode, FC, Dispatch, SetStateAction, Children } from "react"
import { styled } from "styled-components";

interface ModalProps {
  isOpen: boolean,
  setOpen?: Dispatch<SetStateAction<boolean>>,
  children: ReactNode,
}

const ModalWrapper = styled.div`
  @media screen and (max-width: 500px) {
    width: 100%;
  }
  width: 400px;
`;

export const Modal: FC<ModalProps> = ({ isOpen, setOpen, children }) => {

  if (!isOpen) return null;

  return (
    <div className="absolute top-2/4 left-2/4 inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-60"
        onClick={setOpen ? () => setOpen(false) : undefined}
      ></div>
      <ModalWrapper className={`flex flex-col fixed left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-md z-10 h-1/3`}>
        <div className="grid gap-4">
          {children}
        </div>
      </ModalWrapper>
    </div>
  )
}
