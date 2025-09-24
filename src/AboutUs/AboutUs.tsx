import { Card, Container } from "@mantine/core";

const AboutUs = () => (
    <Container size="md" className="pb-5 pt-10">
        <Card
            shadow="md"
            radius="lg"
            padding="xl"
        >
            <Card.Section >
                <div className="justify-center items-center flex flex-col gap-5 mb-6">
                    <div>
                        <div className="text-3xl font-bold">About Us</div>
                    </div>
                    <div className="text-center">USJ Connect is a modern platform designed to bridge the gap between students and companies, helping you discover opportunities, connect, and grow. Our mission is to empower careers and foster innovation in the campus community.</div>
                </div>
            </Card.Section>
        </Card>
    </Container>
);

export default AboutUs;