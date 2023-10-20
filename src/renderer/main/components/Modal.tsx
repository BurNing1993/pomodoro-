import React, { useEffect, useRef, type PropsWithChildren } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  title?: React.ReactNode
  footer?: React.ReactNode
}

const Modal: React.FC<PropsWithChildren<Props>> = ({
  open,
  onClose,
  children,
  title = 'modal',
  footer,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null!)

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal()
    } else {
      dialogRef.current.close()
    }
  }, [open])

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        {/* if there is a button in form, it will close the modal */}
        <div className="pb-4">
          <h3 className="font-bold text-lg truncate">{title}</h3>
        </div>
        <div>{children}</div>
        {footer != null && <div className="pt-4">{footer}</div>}
      </div>
    </dialog>
  )
}

export default Modal
