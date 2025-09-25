import { Group, Image, Text, Container, Card, Badge } from "@mantine/core";

const supporters = [
    {
        name: " Prof. Ravindra De Silva",
        role: "Project Advisor",
        img: "https://ui-avatars.com/api/?name=Samantha+Fernando&background=FFD700&color=8B0000",
        desc: "Provided strategic guidance, ensured project alignment with goals, facilitated stakeholder communication, and supported risk management throughout the project lifecycle."
    },
    {
        name: "Dr. Ravimal Bandara",
        role: "Project Advisor",
        img: "https://ui-avatars.com/api/?name=Ruwan+Jayasuriya&background=FFD700&color=8B0000",
        desc: "Offered industry insights, shared best practices, guided technical decisions, and helped bridge the gap between academic concepts and real-world applications."
    },
    {
        name: "Mr. Thisura Embuldeniya",
        role: "Mentor",
        img: "https://ui-avatars.com/api/?name=Ruwan+Jayasuriya&background=FFD700&color=8B0000",
        desc: "Offered industry insights, shared best practices, guided technical decisions, and helped bridge the gap between academic concepts and real-world applications."
    },
];

const SupportSection = () => (
    <Container size="lg" className="py-5">
        <Card
            shadow="md"
            radius="lg"
            padding="xl"
        >
            <Card.Section >
                <div className="justify-center items-center flex flex-col py-5">
                    <div className="text-3xl max-[400px]:text-2xl font-bold">Project Support</div>
                </div>
            </Card.Section>

            <div className="flex gap-6 justify-around max-[400px]:flex-wrap">
                {supporters.map((dev) => (
                    <Card key={dev.name} shadow="md" radius="lg" padding="xl">
                        <Card.Section component="a" href="">
                            <Image
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                                height={10}
                                width={5}
                                alt="Norway"
                                className="h-[200px] flex flex-col justify-between"
                            />
                        </Card.Section>
                        <Group justify="space-between" mt="md" mb="xs">
                            <Text size="lg" fw={500}>{dev.name}</Text>
                            <Badge color="yellow">{dev.role}</Badge>
                        </Group>
                        <Text size="sm" c="dimmed" className="h-[100px] text-justify">
                            {dev.desc}
                        </Text>
                    </Card>
                ))}
            </div>
        </Card>
    </Container>
);

export default SupportSection;