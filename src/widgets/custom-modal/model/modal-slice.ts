import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type WriteModal = {
    rating?: number,
    message?: string
}

type ModalState = Record<string, WriteModal | boolean>

const initialState: ModalState = {
    openErrorModal: false,
    openServerErrorModal: false,
    openSuccessModal: false,
    openWriteModal: false,
    openCatalogModal: false,
    openJointTrainingModal: false,
    openSaveTrainingErrorModal: false,
    openTrainingsBasicModal: false,
    openTrainingsAddModal: false,
    openSuccessTariffModal: false,
    openModalSaveUserDataError: false,
    openModalPalInfo: false,
    writeModalValues: {}
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModalState: (state: ModalState, action: PayloadAction<ModalState>) => {
            for (const [key, value] of Object.entries(action.payload)) {
                if(typeof value === 'boolean'){
                    state[key] = value
                }else{
                    state[key] = JSON.parse(JSON.stringify(value))
                }

            }
        },
        clearModalState: (state: ModalState) => {
            /* eslint-disable-next-line */
            for (const [key,value] of Object.entries(state)) {
                if(typeof value === 'boolean'){
                    /* eslint-disable-next-line */
                    state[key] = false
                }
            }
        }
    },
    selectors: {
        useModalStateSelector: (state: ModalState) => state
    }
})

export const { setModalState, clearModalState } = modalSlice.actions
export const { useModalStateSelector } = modalSlice.selectors

export default modalSlice.reducer
