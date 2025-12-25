import Container from "@/components/Container";
import React from "react";

const AboutPage = () => {
  return (
    <Container className="max-w-4xl lg:px-8 py-16">
      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-darkColor">
            GRAVEX CO.
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
            Gravex Co. is more than a fashion label — it is a movement built on
            confidence, creativity, and cultural expression. Born from the
            belief that clothing should represent identity rather than follow
            trends, Gravex Co. exists to redefine everyday fashion through bold
            design, thoughtful detail, and purpose-driven style. We see fashion
            not just as fabric, but as a powerful form of self-expression that
            speaks before words do.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-gray-600 leading-loose">
          <p>
            Our collections are crafted for individuals who move with intention
            and dress with meaning. From minimal essentials to statement
            silhouettes, every piece is designed to balance comfort, quality,
            and attitude. We focus on versatile designs that transition
            seamlessly from street to lifestyle, allowing wearers to express
            themselves freely without compromise. At Gravex Co., design is
            driven by culture, inspired by real people, and shaped by the energy
            of modern urban life.
          </p>
          <p>
            We believe style should empower. That’s why our approach goes beyond
            aesthetics — it’s about confidence, individuality, and authenticity.
            Gravex Co. stands for those who challenge norms, embrace
            originality, and wear their purpose proudly. Each drop reflects our
            commitment to breaking boundaries, rejecting fast-fashion mindsets,
            and creating pieces that hold value beyond the moment.
          </p>
          <p>
            Our vision is to build a fashion culture that speaks louder than
            trends and lasts longer than seasons. We are here to elevate the
            everyday, turning simple moments into statements and ordinary
            outfits into expressions of identity. Gravex Co. isn’t just about
            what you wear — it’s about who you are, how you move, and what you
            stand for.
          </p>
        </div>

        <div className="pt-8 border-t border-gray-100">
          <p className="text-xl font-semibold text-darkColor">
            Welcome to Gravex Co.
          </p>
          <p className="text-lg text-gray-500 mt-1">Elevate the Everyday.</p>
        </div>
      </section>
    </Container>
  );
};

export default AboutPage;

