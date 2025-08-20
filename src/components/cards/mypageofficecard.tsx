import { FaEllipsisV, FaRegEdit, FaRegEye, FaRegEyeSlash, FaRegTrashAlt, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { Menu, MenuItem, IconButton } from "@mui/material";
import IOffice from "../../interfaces/IOffice";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import RemoveDialog from "../reusable/dialogs/removedialog";
import { Link } from "react-router-dom";
import { Modal } from "@mui/material";
import { MdOutlineImageNotSupported } from "react-icons/md";
import MultiStepOfficeForm from "../reusable/forms/createofficeform/multistepofficeform";

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
                className={`w-full flex bg-white text-gray-700 rounded-xl overflow-hidden group transition-all duration-200 hover:shadow-md ${office.hidden ? 'opacity-75' : ''}`}
            >
                <div className="h-28 w-28 min-w-28 bg-gray-100 relative overflow-hidden">
                    {office.thumbnails[0] ? (
                        <img
                            src={import.meta.env.VITE_BUCKET_ADDRESS + office.thumbnails[0]}
                            className="w-full h-full object-cover"
                            alt={office.name}
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                            <MdOutlineImageNotSupported size={32} />
                        </div>
                    )}
                    {office.hidden && (
                        <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                            <span className="text-white text-sm font-medium px-2 py-1 bg-gray-900/50 rounded-md">Dold</span>
                        </div>
                    )}
                </div>
                <div className="w-full flex items-center h-full px-6 py-4">
                    <div className="min-w-0"> {/* Added to prevent text overflow */}
                        <h1 className="text-lg font-semibold text-gray-900 truncate">{office.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary">
                                {office.types[0]}
                            </span>
                            <span className="text-sm text-gray-500">{office.location}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                            {office.price && (
                                <p className="text-sm text-gray-600">
                                    {new Intl.NumberFormat('sv-SE', { style: 'currency', currency: 'SEK' }).format(office.price)} /mån
                                </p>
                            )}
                            {office.size && (
                                <p className="text-sm text-gray-600">
                                    {office.size} m²
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link
                            to={`/lokal/${office._id}`}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            title="Visa annons"
                        >
                            <FaExternalLinkAlt size={16} />
                        </Link>
                        <IconButton 
                            onClick={handleMenuOpen} 
                            aria-label="menu"
                            className="text-gray-400 hover:text-primary hover:bg-primary/5"
                        >
                            <FaEllipsisV size={16} />
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
        <Modal onClose={handleClose} open={open} className="flex items-center justify-center overflow-y-auto">
            <div className="bg-white max-w-6xl w-full my-8 mx-4 p-8 rounded-2xl shadow-xl relative">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <FaTimes size={20} />
                </button>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Redigera annons</h2>
                <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
                    <MultiStepOfficeForm handleClose={handleClose} id={id} method={"PUT"} />
                </div> 
            </div>
        </Modal>
    );
};

export default MyPageOfficeCard;