import Image from "next/image";
import Link from "next/link";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  link?: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description, link = "#" }) => (
  <div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2">
    <Link href={link} className="absolute inset-0 z-10" prefetch={false}>
      <span className="sr-only">View {title}</span>
    </Link>
    <div className="relative w-full h-64">
      <Image 
        src={imageSrc} 
        alt={title} 
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
    <div className="p-4 bg-background">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface CardsProps {
  items: CardProps[];
}

const Cards: React.FC<CardsProps> = ({ items }) => (
  <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 lg:p-6">
    {items.map((item) => (
      <Card
        key={`${item.title}-${item.imageSrc}`}
        imageSrc={item.imageSrc}
        title={item.title}
        description={item.description}
        link={item.link}
      />
    ))}
  </section>
);

export default Cards;
