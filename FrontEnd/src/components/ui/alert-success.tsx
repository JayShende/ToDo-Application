import { CircleCheck } from "lucide-react";

interface PropInt{
  desc:string;
}

function AlertDemo(props:PropInt) {
  return (
    <div className="border-eborder rounded-lg border px-4 py-3 my-4 mx-6">
      <p className="text-sm flex justify-center items-center ">
        <CircleCheck
          className="-mt-0.5 me-3 inline-flex text-emerald-500"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        {props.desc}
      </p>
    </div>
  );
}

export { AlertDemo };