import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material"

interface RemoveButtonProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleRemove: () => void,
    dialogText: string
}
const RemoveDialog = ({open, setOpen, handleRemove, dialogText}: RemoveButtonProps) => {
    return (
        <Dialog
                open={open}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {dialogText} 
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={() => setOpen(false)} className="p-2 rounded hover:bg-gray-100">Close</button>
                    <button onClick={() => handleRemove()} className="p-2 rounded hover:bg-red-100 text-red-500">Remove</button>
                </DialogActions>
            </Dialog>
    )
}

export default RemoveDialog