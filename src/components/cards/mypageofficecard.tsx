import { FaEllipsisV, FaRegEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import { Menu, MenuItem, IconButton } from "@mui/material";
import IOffice from "../../interfaces/IOffice";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import RemoveDialog from "../reusable/dialogs/removedialog";
import OfficeForm from "../reusable/forms/officeform";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { MdOutlineImageNotSupported } from "react-icons/md";

interface MyPageOfficeCardProps {
    office: IOffice;
}

const MyPageOfficeCard = ({ office }: MyPageOfficeCardProps) => {
    const [openRemove, setOpenRemove] = useState<boolean>(false);
    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
    const queryClient = useQueryClient();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    const handleRemove = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${office._id}`, {
            method: "DELETE",
            credentials: "include",
        });
        queryClient.invalidateQueries({ queryKey: ["my-offices"] });
        setOpenRemove(false);
    };

    return (
        <>
            <div
                key={"mypage-office-" + office._id}
                className="w-full flex bg-white text-gray-700 border rounded-md overflow-hidden group transition-all"
            >
                <div className="h-24 w-24 min-w-24 bg-gray-700">
                    {office.thumbnails[0] ? (
                        <img
                            src={import.meta.env.VITE_BUCKET_ADDRESS + office.thumbnails[0]}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <MdOutlineImageNotSupported size={32} />
                        </div>
                    )}
                </div>
                <div className="w-full flex items-center h-full px-8 py-4">
                    <div >
                        <h1 className="text-xl">{office.name}</h1>
                        <h3 className="font-light text-gray-500">{office.location}</h3>
                    </div> 
                    <div className="ml-auto">
                        <IconButton onClick={handleMenuOpen} aria-label="menu">
                            <FaEllipsisV className="text-primary" />
                        </IconButton>
                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleMenuClose}
                            PaperProps={{
                                style: {
                                    minWidth: "150px",
                                },
                            }}
                        >
                            {!office.hidden && (
                                <MenuItem onClick={handleMenuClose}>
                                    <Link
                                        to={`/lokal/${office._id}`}
                                        className="flex items-center gap-2 text-gray-700"
                                    >
                                        <FaExternalLinkAlt />
                                        <span>Visa</span>
                                    </Link>
                                </MenuItem>
                            )}
                            <MenuItem
                                onClick={() => {
                                    ToggleHidden(office._id, office.hidden, queryClient);
                                    handleMenuClose();
                                }}
                                className="flex items-center gap-2"
                            >
                                {!office.hidden ? <FaRegEyeSlash /> : <FaRegEye />}
                                <span>{!office.hidden ? "Dölj" : "Visa"}</span>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setOpenEdit(true);
                                    handleMenuClose();
                                }}
                                className="flex items-center gap-2"
                            >
                                <FaRegEdit />
                                <span>Redigera</span>
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setOpenRemove(true);
                                    handleMenuClose();
                                }}
                                className="flex items-center gap-2 text-red-500"
                            >
                                <FaRegTrashAlt />
                                <span>Ta bort</span>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
                <RemoveDialog
                    open={openRemove}
                    setOpen={setOpenRemove}
                    handleRemove={handleRemove}
                    dialogText={"Är du säker på att du vill ta bort det här kontoret?"}
                />
            </div>
            <EditForm open={openEdit} setOpenEdit={setOpenEdit} id={office._id} />
        </>
    );
};

const ToggleHidden = async (id: string, hidden: boolean, queryClient: any) => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_ADDRESS}/api/office/${id}/hidden`, {
        credentials: "include",
    });
    if (response.status === 200) {
        toast.success("Successfully toggled visibility of office");
    } else {
        toast.error("Failed to toggle visibility of office");
    }
    queryClient.invalidateQueries({ queryKey: ["my-offices"] });
    queryClient.invalidateQueries({ queryKey: ["all-my-offices"] });
};

const EditForm = ({ open, setOpenEdit, id }: { open: boolean; setOpenEdit: (value: boolean) => void; id: string }) => {
    const handleClose = () => {
        setOpenEdit(false);
    };
    return (
        <Modal onClose={handleClose} open={open} className="flex items-center justify-center">
            <div className="bg-white overflow-y-scroll w-2/3 h-3/4 p-16 rounded-md shadow-lg">
                <OfficeForm handleClose={handleClose} id={id} method={"PUT"} />
            </div>
        </Modal>
    );
};

export default MyPageOfficeCard;