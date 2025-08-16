import MultiStepOfficeForm from '../../reusable/forms/createofficeform/createofficeform';

const HyrUtLokal = () => {
    return (
        <div className="bg-neutral-50">
            <div className="w-full max-w-6xl mx-auto md:my-16 p-8">
                <MultiStepOfficeForm method={"POST"} />
                {/* <OfficeForm method="POST" /> */} 
            </div>
        </div>
    );
};

export default HyrUtLokal;