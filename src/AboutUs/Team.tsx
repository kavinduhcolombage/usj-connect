import { Group, Image, Text, Card, Container, Badge } from "@mantine/core";

const developers = [
  {
    name: "Kavindu Hansana",
    role: "Frontend Developer",
    img: "/AboutUs/kavindu_hansana.png",
    desc: "Developed responsive user interface, implemented dynamic components, ensured accessibility, and optimized performance using modern frameworks."
  },
  {
    name: "Kavindu Lakshan",
    role: "Backend Developer",
    img: "/AboutUs/kavindu_lakshan.png",
    desc: "Designed secure database schemas, built scalable REST APIs, integrated authentication, and ensured reliable server-side performance."
  },
];

const Team = () => (
  <Container size="md" className="py-5">
    <Card
      shadow="md"
      radius="lg"
      padding="xl"
    >
      <Card.Section >
        <div className="justify-center items-center flex flex-col py-5">
          <div className="text-3xl max-[400px]:text-2xl font-bold">Development Team</div>
        </div>
      </Card.Section>

      <div className="flex gap-6 justify-around max-[400px]:flex-wrap">
        {developers.map((dev) => (
          <Card key={dev.name} shadow="md" radius="lg" padding="xl">
            <Card.Section component="a" href="">
              <Image
                className="!w-110 !h-80 max-[400px]:!w-80 max-[400px]:!h-50"
                src={dev.img}
                height={1}
                width={15}
                alt="image"
              />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
              <Text size="lg" fw={500}>{dev.name}</Text>
              <Badge color="yellow">{dev.role}</Badge>
            </Group>
            <Text size="sm" c="dimmed" className="text-justify">
              {dev.desc}
            </Text>
          </Card>
        ))}

      </div>

    </Card>
  </Container>
);

export default Team;