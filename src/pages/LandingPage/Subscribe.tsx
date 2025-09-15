import { Button, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Subscribe = () => {
  const isTab = useMediaQuery('(max-width: 700px)');
  const isMob = useMediaQuery('(max-width: 450px)');
  return (
    <div className="my-10 flex items-center bg-red-700 mx-20 max-[700px]:mx-10 max-[650px]:mx-5 max-[700px]:my-6 rounded-xl justify-around max-[570px]:flex-wrap p-2">
      <div className="text-4xl max-[1000px]:text-3xl max-[750px]:text-2xl max-[700px]:text-xl max-[450px]:text-lg w-2/5 max-[570px]:w-full text-center font-semibold pt-2 pb-2 px-2 max-[450px]:pb-0">Never Wants Miss Any <span className="text-yellow-400">Job News?</span>
      </div>
      <div className="flex gap-4 rounded-xl px-3 py-2 max-[450px]:pb-3 items-center max-[570px]:w-full max-[570px]:justify-center">
        <TextInput
          size={isTab ? isMob ? "xs" : "sm" : "lg"}
          radius="md"
          placeholder="Your@email.com"
        />
        <Button className="!rounded-lg" size={isTab ? isMob ? "xs" : "sm" : "lg"} color="yellow" variant="filled" >Subscribe</Button>
      </div>
    </div>
  )
};

export default Subscribe;