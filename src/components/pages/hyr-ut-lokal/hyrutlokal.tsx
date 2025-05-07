import BackButton from '../../buttons/backbutton';
import OfficeForm from '../../reusable/forms/officeform';

const HyrUtLokal = () => {
    return (
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white mx-auto py-16 md:py-8 md:my-16 p-8 lg:rounded-lg lg:shadow-md">
            <div>
                <BackButton link={"/"}/>
                <h1 className="text-2xl font-semibold mt-2">Lägg upp en ny annons</h1> 
            </div>
            <OfficeForm method="POST" />
        </div>
    );
};

export default HyrUtLokal;