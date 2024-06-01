'use client'
import { useContext, useState } from 'react'
import { Check } from 'phosphor-react'
import { Button, Modal } from 'keep-react'
import { AuthContext } from '../AuthProvider/AuthProvider'


 const Success = () => {
const {closeSuccessModal,isSuccessOpen,modelHead,modelMessage} =useContext(AuthContext)

  return (
    <>
     
      <Modal  isOpen={isSuccessOpen} onClose={closeSuccessModal}>
        <Modal.Body className="flex bg-slate-300 w-[30rem] flex-col items-center p-6 lg:p-8">
          <Modal.Icon className="h-20 w-20 border border-success-100 bg-success-50 text-success-500">
            <Check size={60} />
          </Modal.Icon>
          <Modal.Content className="my-4 text-center">
            <h3 className="mb-2 text-body-1 font-bold text-metal-900">{modelHead}</h3>
            <p className="mx-auto max-w-xs text-body-4 font-normal text-metal-600">
            {modelMessage}
            </p>
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={closeSuccessModal} size="sm" color="success">
              Okey
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Success