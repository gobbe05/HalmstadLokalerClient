import MultiStepOfficeForm from '../../reusable/forms/createofficeform/multistepofficeform';
import { Helmet } from 'react-helmet-async';

const HyrUtLokal = () => {
        return (
                <>
                    <Helmet>
                        <title>Hyr ut lokal – HalmstadLokaler</title>
                        <meta name="description" content="Lägg upp din lokal och nå företagare i Halmstad. Skapa annons och hantera uthyrning enkelt på HalmstadLokaler." />
                    </Helmet>
                    <div className="bg-neutral-50">
                            <div className="w-full max-w-6xl mx-auto md:my-16 p-8">
                                    <MultiStepOfficeForm method={"POST"} />
                                    {/* <OfficeForm method="POST" /> */} 
                            </div>
                    </div>
                </>
        );
};

export default HyrUtLokal;