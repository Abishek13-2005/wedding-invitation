type IllustrationType =
  | "church"
  | "rings"
  | "blessings"
  | "lunch";

interface Props {
  type: IllustrationType;
}

export default function ChurchIllustration({
  type,
}: Props) {
  if (type === "rings") {
    return (
      <svg
        className="timeline-illustration"
        viewBox="0 0 300 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="128"
          cy="105"
          r="47"
          stroke="#C4A76A"
          strokeWidth="5"
        />

        <circle
          cx="172"
          cy="105"
          r="47"
          stroke="#C4A76A"
          strokeWidth="5"
        />

        <path
          d="M95 73C105 61 121 56 136 59"
          stroke="#9FC9DE"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <path
          d="M205 137C195 149 179 154 164 151"
          stroke="#9FC9DE"
          strokeWidth="5"
          strokeLinecap="round"
        />

        <circle
          cx="68"
          cy="70"
          r="7"
          fill="#A8D0E2"
        />

        <circle
          cx="53"
          cy="83"
          r="5"
          fill="#D6EAF2"
        />

        <circle
          cx="232"
          cy="140"
          r="7"
          fill="#A8D0E2"
        />

        <circle
          cx="247"
          cy="127"
          r="5"
          fill="#D6EAF2"
        />

        <path
          d="M60 175C75 158 88 158 103 175"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M197 175C212 158 225 158 240 175"
          stroke="#C4A76A"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (type === "blessings") {
    return (
      <svg
        className="timeline-illustration"
        viewBox="0 0 300 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M105 65H145V150C145 161 136 170 125 170C114 170 105 161 105 150V65Z"
          fill="#F9FCFE"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M195 65H155V150C155 161 164 170 175 170C186 170 195 161 195 150V65Z"
          fill="#F9FCFE"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M105 75H94C85 75 80 83 84 91L98 117"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M195 75H206C215 75 220 83 216 91L202 117"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M105 65H145"
          stroke="#C4A76A"
          strokeWidth="3"
        />

        <path
          d="M155 65H195"
          stroke="#C4A76A"
          strokeWidth="3"
        />

        <circle
          cx="70"
          cy="105"
          r="6"
          fill="#A8D0E2"
        />

        <circle
          cx="61"
          cy="118"
          r="4"
          fill="#D6EAF2"
        />

        <circle
          cx="230"
          cy="105"
          r="6"
          fill="#A8D0E2"
        />

        <circle
          cx="239"
          cy="118"
          r="4"
          fill="#D6EAF2"
        />

        <path
          d="M72 155C85 145 94 146 105 157"
          stroke="#9FC9DE"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M195 157C206 146 215 145 228 155"
          stroke="#9FC9DE"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "lunch") {
    return (
      <svg
        className="timeline-illustration"
        viewBox="0 0 300 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="150"
          cy="145"
          rx="92"
          ry="27"
          fill="#FDFDFD"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <ellipse
          cx="150"
          cy="140"
          rx="55"
          ry="18"
          stroke="#9FC9DE"
          strokeWidth="3"
        />

        <path
          d="M112 125C118 105 135 94 150 94C165 94 182 105 188 125"
          stroke="#A8D0E2"
          strokeWidth="4"
        />

        <path
          d="M125 118C131 108 138 103 150 101"
          stroke="#D1E6EF"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d="M175 118C169 108 162 103 150 101"
          stroke="#D1E6EF"
          strokeWidth="7"
          strokeLinecap="round"
        />

        <path
          d="M80 88V156"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M75 88V105"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M85 88V105"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M220 88V156"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M215 88V105"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <path
          d="M225 88V105"
          stroke="#C4A76A"
          strokeWidth="2"
        />

        <circle
          cx="75"
          cy="70"
          r="7"
          fill="#A8D0E2"
        />

        <circle
          cx="225"
          cy="70"
          r="7"
          fill="#A8D0E2"
        />
      </svg>
    );
  }

  return (
    <svg
      className="church-illustration"
      viewBox="0 0 900 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="sky"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#BBDDED"
          />

          <stop
            offset="100%"
            stopColor="#F4FAFC"
          />
        </linearGradient>

        <linearGradient
          id="ground"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor="#E9F2F3"
          />

          <stop
            offset="100%"
            stopColor="#D8E5E3"
          />
        </linearGradient>
      </defs>

      {/* Sky */}

      <rect
        width="900"
        height="600"
        fill="url(#sky)"
      />

      {/* Clouds */}

      <path
        d="M80 145C80 125 98 109 120 109C128 88 150 74 175 74C204 74 227 94 231 120C246 121 258 132 258 147C258 164 244 177 227 177H109C93 177 80 163 80 145Z"
        fill="white"
        opacity="0.65"
      />

      <path
        d="M650 105C650 87 665 73 684 73C692 54 711 43 732 43C758 43 778 61 782 84C797 85 808 97 808 111C808 126 796 137 781 137H675C661 137 650 124 650 105Z"
        fill="white"
        opacity="0.55"
      />

      {/* Ground */}

      <path
        d="M0 425C170 395 310 420 450 406C590 392 730 390 900 418V600H0V425Z"
        fill="url(#ground)"
      />

      {/* Church body */}

      <rect
        x="285"
        y="270"
        width="330"
        height="190"
        rx="2"
        fill="#FFFFFF"
        stroke="#D4D9D8"
        strokeWidth="3"
      />

      {/* Church roof */}

      <path
        d="M255 275L450 150L645 275H255Z"
        fill="#F9FBFB"
        stroke="#C4A76A"
        strokeWidth="3"
      />

      {/* Tower */}

      <rect
        x="400"
        y="115"
        width="100"
        height="175"
        fill="#FFFFFF"
        stroke="#D4D9D8"
        strokeWidth="3"
      />

      {/* Tower roof */}

      <path
        d="M388 120L450 48L512 120H388Z"
        fill="#FFFFFF"
        stroke="#C4A76A"
        strokeWidth="3"
      />

      {/* Cross */}

      <path
        d="M450 30V82"
        stroke="#C4A76A"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <path
        d="M433 50H467"
        stroke="#C4A76A"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* Tower window */}

      <path
        d="M428 150C428 137 438 127 450 127C462 127 472 137 472 150V181H428V150Z"
        fill="#B9D9E8"
        stroke="#C4A76A"
        strokeWidth="2"
      />

      {/* Church windows */}

      <path
        d="M325 315C325 295 340 280 360 280C380 280 395 295 395 315V355H325V315Z"
        fill="#B9D9E8"
        stroke="#C4A76A"
        strokeWidth="2"
      />

      <path
        d="M505 315C505 295 520 280 540 280C560 280 575 295 575 315V355H505V315Z"
        fill="#B9D9E8"
        stroke="#C4A76A"
        strokeWidth="2"
      />

      {/* Main entrance */}

      <path
        d="M405 460V380C405 345 425 325 450 325C475 325 495 345 495 380V460H405Z"
        fill="#D8ECF4"
        stroke="#C4A76A"
        strokeWidth="3"
      />

      <circle
        cx="450"
        cy="395"
        r="4"
        fill="#C4A76A"
      />

      {/* Steps */}

      <rect
        x="395"
        y="460"
        width="110"
        height="8"
        fill="#E4E7E5"
      />

      <rect
        x="380"
        y="468"
        width="140"
        height="8"
        fill="#D5DCDA"
      />

      {/* Floral arch */}

      <path
        d="M240 440C245 340 320 290 385 350"
        stroke="#9FC9DE"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <path
        d="M660 440C655 340 580 290 515 350"
        stroke="#9FC9DE"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Flowers left */}

      <g>
        <circle
          cx="245"
          cy="420"
          r="14"
          fill="#D9EDF4"
        />
        <circle
          cx="225"
          cy="402"
          r="11"
          fill="#A8D0E2"
        />
        <circle
          cx="267"
          cy="397"
          r="12"
          fill="#FFFFFF"
        />
        <circle
          cx="250"
          cy="375"
          r="10"
          fill="#A8D0E2"
        />
        <circle
          cx="280"
          cy="425"
          r="12"
          fill="#FFFFFF"
        />
      </g>

      {/* Flowers right */}

      <g>
        <circle
          cx="655"
          cy="420"
          r="14"
          fill="#D9EDF4"
        />
        <circle
          cx="675"
          cy="402"
          r="11"
          fill="#A8D0E2"
        />
        <circle
          cx="633"
          cy="397"
          r="12"
          fill="#FFFFFF"
        />
        <circle
          cx="650"
          cy="375"
          r="10"
          fill="#A8D0E2"
        />
        <circle
          cx="620"
          cy="425"
          r="12"
          fill="#FFFFFF"
        />
      </g>

      {/* Greenery */}

      <path
        d="M200 455C235 430 255 440 290 415"
        stroke="#92A99F"
        strokeWidth="4"
      />

      <path
        d="M700 455C665 430 645 440 610 415"
        stroke="#92A99F"
        strokeWidth="4"
      />

      {/* Small flowers */}

      <circle
        cx="175"
        cy="460"
        r="7"
        fill="#A8D0E2"
      />

      <circle
        cx="725"
        cy="460"
        r="7"
        fill="#A8D0E2"
      />

      <circle
        cx="150"
        cy="445"
        r="5"
        fill="#FFFFFF"
      />

      <circle
        cx="750"
        cy="445"
        r="5"
        fill="#FFFFFF"
      />
    </svg>
  );
}