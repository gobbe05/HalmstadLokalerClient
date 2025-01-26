import BackButton from '../../buttons/backbutton';
import OfficeForm from '../../reusable/forms/officeform';

const HyrUtLokal = () => {
    return (
        <div className="w-1/2 bg-white mx-auto my-16 p-8 rounded-lg shadow-md">
            <div>
                <BackButton link={"/"}/>
                <h1 className="text-2xl font-semibold">Lägg upp en ny annons</h1> 
            </div>
            <OfficeForm method="POST" />
        </div>
    );
};

export default HyrUtLokal;