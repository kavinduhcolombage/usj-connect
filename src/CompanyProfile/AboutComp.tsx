import { companyData } from "../Data/Company";

const AboutComp = () => {
    const company: { [key: string]: any } = companyData;
    return (
        <div className="flex flex-col gap-3">
            {
                Object.keys(company).map((key, index) => key != 'Name' && <div key={index}>
                    <div className="text-2xl mb-3 font-semibold">{key}</div>
                    {key != 'Website' && <div className="text-base text-justify">{key != "Specialties" ? company[key] : company[key].map((item: string, index: number) => <span key={index}> &bull; {item}</span>)}</div>}
                    {key == 'Website' && <a href={company[key]} target="_blank" className="text-blue-600 text-base text-justify">{company[key]}</a>}
                </div>)
            }
        </div>
    )
}

export default AboutComp;