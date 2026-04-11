// src/app/components/DemoCard.tsx

interface DemoProps {
  title: string;
  description: string;
  tag: string;
}

export default function DemoCard({ title, description, tag }: DemoProps) {
  return (
    <div className="group p-6 bg-[#111] border border-neutral-800 rounded-xl hover:border-blue-500 transition-all cursor-pointer w-full">
      <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">
        {tag}
      </span>
      <h3 className="text-xl font-bold mt-2 group-hover:text-blue-400 transition-colors text-white">
        {title}
      </h3>
      <p className="text-neutral-500 text-sm mt-2 leading-relaxed">
        {description}
      </p>
      <div className="mt-4 text-white font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
        VER DEMO →
      </div>
    </div>
  );
}