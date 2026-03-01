import "./GrowingUpina3rdWorldCountrybelike.css";
import Image from "next/image";
import brazilImg from "../img/brazil.jpg";

export default function GrowingUpina3rdWorldCountrybelike() {
  return (
    <article className="post-container">
      <figure className="post-image">
        <Image
          src={brazilImg}
          alt="Aerial view of a city in a developing country—contrast between neighborhoods and growth. Growing up in a third world country."
        />
      </figure>

      <div className="post-content">
        <p>
          I've been thinking a lot about something that started with a simple YouTube video about Central Asia.
          The topic was economic growth. Uzbekistan. Kazakhstan. China's Belt and Road Initiative.
          Nothing dramatic.
          But one phrase stuck with me.
          They described our region as a "corridor."
          A corridor.
          At first, it sounds important. Strategic. Valuable.
          But the more I thought about it, the more uncomfortable it felt.
          A corridor is not the destination.
          It's the space people walk through to reach somewhere else.
          And I started wondering:
          Is that how the world sees us?
        </p>

        <h2 className="post-content-heading">The Stories We're Told</h2>
        <p>
          If you grow up in the modern world, you inherit a certain map in your head.
          The "West" is rich. Advanced. Innovative. Influential.
          Hollywood. Silicon Valley. Finance. Universities.
          Then there's the rest of the world - often described in terms of catching up, reforming, developing.
          And naturally, people try to explain why this hierarchy exists.
          Europe became rich because:
          It had sea access.
          It had wars that pushed innovation.
          It had Protestant reforms.

          Central Asia remained behind because:
          It had too many wars.
          It lacked sea access.
          It lacked unity.

          But when you look closely, the logic feels… selective.
          If wars create progress, why did wars also destroy entire civilizations?
          If sea access guarantees wealth, why are so many coastal countries still struggling?
          And if landlocked geography is destiny, how do we explain the Islamic Golden Age - when scholars from our region helped shape mathematics, astronomy, and medicine?
          Something doesn't add up.
        </p>

        <h2 className="post-content-heading">Pride vs. Rejection</h2>
        <p>
          Growing up in Uzbekistan, I've noticed two extreme reactions to this global hierarchy.
          One group lives in the past.
          They remind everyone of the Timurid Renaissance. The great scholars. The empires.
          They speak as if historical greatness automatically transfers to us.
          But pride in ancestors is not the same as present achievement.
          The other group goes in the opposite direction.
          They reject everything local.
          Language. Culture. Identity.
          As if progress requires disowning where you're from.
          Both reactions feel like responses to insecurity.
          And I understand it. I really do.
          When you grow up in a country that isn't rich, isn't dominant, isn't globally admired, you feel it. Even if nobody says it directly.
          You see it in media. In travel content. In online conversations.
          You start asking yourself:
          Are we behind because of who we are?
          Or because of where we are?
          Or because of something else entirely?
        </p>

        <h2 className="post-content-heading">Corridor or Creator?</h2>
        <p>
          China's Belt and Road Initiative made me think about something deeper.
          Yes, being strategically located brings opportunity.
          Yes, transit routes generate money.
          But a corridor depends on other people moving.
          A strong economy creates movement.
          There's a difference.
          And maybe the real question isn't why Europe became rich or why Central Asia didn't industrialize first.
          Maybe the question is:
          What are we building now?
          Because history isn't just something we analyze.
          It's something we are actively participating in.
        </p>

        <h2 className="post-content-heading">I Don't Have the Answer</h2>
        <p>
          I'm 19. I don't pretend to have some master theory of civilization.
          I'm just trying to understand the world beyond Instagram reels and simplified YouTube explanations.
          I don't want blind nationalism.
          And I don't want blind self-criticism either.
          I want clarity.
          I want to understand how countries move from being places people pass through to places people look toward.
          And maybe that starts with asking better questions.
          History might be written by the winners.
          But the future - at least a small part of it - is written by people who refuse to accept easy explanations.
        </p>
      </div>
    </article>
  );
}