import { Avatar, Rating } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const UserIdeas = () => {
    const matches = useMediaQuery('(max-width: 450px)');
    return <div className="mt-15 max-[450px]:mt-10 pb-5 max-[450px]:pb-0">
        <div className="text-4xl max-[850px]:text-3xl text-center font-semibold mt-3 text-mine-shaft-100">What <span
            className="text-red-700">User</span> says about us?</div>

        <div className="grid grid-cols-4 gap-2 max-[800px]:grid-cols-2 max-[450px]:grid-cols-1 mx-4 max-[450px]:mx-6 mt-10 max-[450px]:mt-8">
            <div className="flex flex-col gap-2 max-[600px]:gap-0 border border-red-500 rounded-xl mx-auto">
                <div className="flex gap-2 items-center p-2">
                    <Avatar className="h-14 w-14" src="https://media.licdn.com/dms/image/v2/D5603AQG5REMADF5fsA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1716022184704?e=2147483647&v=beta&t=K0DNe25P3J_nSDJZ0ZJwkjkWg0SRAxSBxk2ik1Kvgzw" alt="it's me" />
                    <div>
                        <div className="text-lg max-[600px]:text-base font-semibold">Kavindu Hansana</div>
                        <Rating value={3.5} fractions={2} readOnly />
                    </div>
                </div>
                <div className="text-sm max-[600px]:text-xs p-2 text-justify">This app made it so much easier to find the right internship as a university student. The recommendations were accurate, and the application process was very smooth. I truly appreciate how it connects us with real opportunities that match our skills.</div>
            </div>

            {!matches && <div className="flex flex-col gap-2 max-[600px]:gap-0 border border-red-500 rounded-xl mx-auto">
                <div className="flex gap-2 items-center p-2">
                    <Avatar className="h-14 w-14" src="avatar.png" alt="it's me" />
                    <div>
                        <div className="text-lg max-[600px]:text-base font-semibold">Rashmika Perera</div>
                        <Rating value={3.5} fractions={2} readOnly />
                    </div>
                </div>
                <div className="text-sm max-[600px]:text-xs p-2 text-justify">Finding internships used to be difficult before I started using this app. It offers a wide range of opportunities for students like me and even gives useful insights about the companies. I’m grateful I found this platform on time.

                </div>

            </div>}
            <div className="flex flex-col gap-2 max-[600px]:gap-0 border border-red-500 rounded-xl mx-auto">
                <div className="flex gap-2 items-center p-2">
                    <Avatar className="h-14 w-14" src="https://media.licdn.com/dms/image/v2/D5603AQFgkAz0BdtK8w/profile-displayphoto-shrink_200_200/B56ZT2NdfyHoAY-/0/1739297514052?e=2147483647&v=beta&t=6358iY9SzYsCJvLfli7YazOGwe8xCTBFad97wzq2FM4" alt="it's me" />
                    <div>
                        <div className="text-lg max-[600px]:text-base font-semibold">Kavindu Lakshan</div>
                        <Rating value={5} fractions={2} readOnly />
                    </div>
                </div>
                <div className="text-sm max-[600px]:text-xs p-2 text-justify">As an undergraduate, I struggled to find job openings relevant to my field. But with this app, I was able to discover internships easily. It guided me through the whole process and made everything more manageable and clear.

                </div>

            </div>
            {!matches && <div className="flex flex-col gap-2 max-[600px]:gap-0 border border-red-500 rounded-xl mx-auto">
                <div className="flex gap-2 items-center p-2">
                    <Avatar className="h-14 w-14" src="https://media.licdn.com/dms/image/v2/D4E03AQG03Q_n0I075Q/profile-displayphoto-shrink_200_200/B4EZUXjv.VG0Ac-/0/1739857004388?e=2147483647&v=beta&t=QYuanP7YpHblitEJgLyANE9BZuaowaYLhicdI-NCZQc" alt="it's me" />
                    <div>
                        <div className="text-lg max-[600px]:text-base font-semibold">Pathini Ekanayaka</div>
                        <Rating value={4.5} fractions={2} readOnly />
                    </div>
                </div>
                <div className="text-sm max-[600px]:text-xs p-2 text-justify">This app is the perfect solution for students who are actively looking for internships or part-time roles. It helped me connect with great employers, and I now have valuable experience to add to my resume. Highly recommend it!</div>

            </div>}
        </div>
    </div>
};

export default UserIdeas;