export interface BaseIconProps {
  className?: string
}

export interface IconProps extends BaseIconProps {
  size?: number
}

export const VisaIcon = ({ className }: BaseIconProps): JSX.Element => (
  <svg height="1em" viewBox="0 0 128 72" fill="none" className={className}>
    <rect width="128" height="72" fill="white" />
    <g clipPath="url(#clip0_2867_2)">
      <path
        d="M78.5142 20.375C71.705 20.375 65.6195 23.925 65.6195 30.4825C65.6195 38.0036 76.4118 38.523 76.4118 42.3018C76.4118 43.8929 74.5994 45.317 71.5024 45.317C67.1085 45.317 63.8243 43.3272 63.8243 43.3272L62.4189 49.9455C62.4189 49.9455 66.2022 51.6264 71.225 51.6264C78.6698 51.6264 84.5286 47.9025 84.5286 41.2321C84.5286 33.2843 73.6912 32.7803 73.6912 29.2738C73.6912 28.0273 75.1792 26.6622 78.2666 26.6622C81.7504 26.6622 84.592 28.1094 84.592 28.1094L85.9677 21.718C85.9677 21.718 82.8746 20.375 78.5133 20.375H78.5142ZM16.2131 20.8577L16.048 21.8222C16.048 21.8222 18.9126 22.3494 21.4931 23.4018C24.8157 24.6076 25.0518 25.3105 25.6115 27.4905L31.7085 51.1282H39.8819L52.4733 20.8577H44.319L36.2282 41.4387L32.9267 23.9926C32.6243 21.996 31.0902 20.8568 29.2134 20.8568H16.2141L16.2131 20.8577ZM55.7526 20.8577L49.3562 51.1282H57.1322L63.5056 20.8577H55.7526ZM99.1216 20.8577C97.2467 20.8577 96.2531 21.8676 95.5245 23.6315L84.1322 51.1282H92.2864L93.8637 46.5451H103.798L104.757 51.1282H111.952L105.676 20.8577H99.1216ZM100.182 29.0362L102.6 40.395H96.1245L100.183 29.0362H100.182Z"
        fill="#1434CB"
      />
    </g>
    <defs>
      <clipPath id="clip0_2867_2">
        <rect
          width="96"
          height="31.3469"
          fill="white"
          transform="translate(16 20.3267)"
        />
      </clipPath>
    </defs>
  </svg>
)

export const MasterCardIcon = ({ className }: BaseIconProps): JSX.Element => (
  <svg height="1em" viewBox="0 0 128 72" fill="none" className={className}>
    <rect width="128" height="72" fill="white" />
    <g clipPath="url(#clip0_2867_5)">
      <path
        d="M45.568 6.33594C37.709 6.36137 30.1812 9.50447 24.6375 15.0751C19.0938 20.6458 15.9873 28.1887 16 36.0478C16.0128 43.9068 19.1437 51.4397 24.7054 56.9924C30.2671 62.5451 37.8049 65.6638 45.664 65.6638C53.5231 65.6638 61.0609 62.5451 66.6226 56.9924C72.1843 51.4397 75.3152 43.9068 75.328 36.0478C75.3407 28.1887 72.2342 20.6458 66.6905 15.0751C61.1468 9.50447 53.619 6.36137 45.76 6.33594L45.568 6.33594Z"
        fill="#EB001B"
      />
      <path
        d="M82.24 6.33594C74.381 6.36137 66.8532 9.50447 61.3095 15.0751C55.7658 20.6458 52.6593 28.1887 52.672 36.0478C52.6848 43.9068 55.8157 51.4397 61.3774 56.9924C66.9391 62.5451 74.4769 65.6638 82.336 65.6638C90.1951 65.6638 97.7329 62.5451 103.295 56.9924C108.856 51.4397 111.987 43.9068 112 36.0478C112.013 28.1887 108.906 20.6458 103.362 15.0751C97.8188 9.50447 90.291 6.36137 82.432 6.33594L82.24 6.33594Z"
        fill="#F79E1B"
      />
      <path
        d="M64 12.6719C60.4664 15.4475 57.6095 18.9895 55.645 23.0307C53.6805 27.0719 52.6597 31.5065 52.6597 35.9999C52.6597 40.4932 53.6805 44.9279 55.645 48.969C57.6095 53.0102 60.4664 56.5523 64 59.3279C67.5336 56.5523 70.3905 53.0102 72.355 48.969C74.3195 44.9279 75.3403 40.4932 75.3403 35.9999C75.3403 31.5065 74.3195 27.0719 72.355 23.0307C70.3905 18.9895 67.5336 15.4475 64 12.6719Z"
        fill="#FF5F00"
      />
    </g>
    <defs>
      <clipPath id="clip0_2867_5">
        <rect
          width="96"
          height="59.328"
          fill="white"
          transform="translate(16 6.33594)"
        />
      </clipPath>
    </defs>
  </svg>
)

export const UnknownCardIcon = ({ className }: BaseIconProps): JSX.Element => (
  <svg height="1em" viewBox="0 0 128 72" fill="none" className={className}>
    <g clipPath="url(#clip0_2867_12)">
      <rect width="128" height="72" fill="white" />
      <path
        d="M61.148 45.724V43.868C61.148 41.692 61.5533 39.6653 62.364 37.788C63.1747 35.868 64.604 33.7133 66.652 31.324C68.2733 29.4467 69.404 27.8467 70.044 26.524C70.684 25.2013 71.004 23.7933 71.004 22.3C71.004 20.508 70.364 19.1 69.084 18.076C67.804 17.0093 66.0333 16.476 63.772 16.476C61.4253 16.476 59.2493 16.9027 57.244 17.756C55.2387 18.6093 53.34 19.8893 51.548 21.596L49.628 17.5C51.292 15.7933 53.404 14.428 55.964 13.404C58.524 12.3373 61.212 11.804 64.028 11.804C67.6973 11.804 70.6627 12.7427 72.924 14.62C75.1853 16.4547 76.316 18.8867 76.316 21.916C76.316 23.9213 75.868 25.7987 74.972 27.548C74.1187 29.2973 72.604 31.324 70.428 33.628C68.4227 35.7613 66.9933 37.6387 66.14 39.26C65.3293 40.8387 64.8173 42.46 64.604 44.124L64.476 45.724H61.148ZM59.548 57.5V50.972H66.076V57.5H59.548Z"
        fill="#163D6B"
      />
    </g>
    <defs>
      <clipPath id="clip0_2867_12">
        <rect width="128" height="72" fill="white" />
      </clipPath>
    </defs>
  </svg>
)

export const ExerciseIcon = ({ className, size }: IconProps): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M7.98053 0.54541H4.92602C4.56453 0.54541 4.27148 0.838458 4.27148 1.19995V10.7998C4.27148 11.1614 4.56453 11.4544 4.92602 11.4544H7.98053C8.34203 11.4544 8.63507 11.1614 8.63507 10.7998V1.19995C8.63507 0.838458 8.34203 0.54541 7.98053 0.54541Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.0743 0.54541H18.0198C17.6582 0.54541 17.3652 0.838458 17.3652 1.19995V10.7998C17.3652 11.1614 17.6582 11.4544 18.0198 11.4544H21.0743C21.4358 11.4544 21.7288 11.1614 21.7288 10.7998V1.19995C21.7288 0.838458 21.4358 0.54541 21.0743 0.54541Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 8.61741V3.3811C1 3.01961 1.29305 2.72656 1.65454 2.72656H3.61815C3.97964 2.72656 4.27269 3.01961 4.27269 3.3811V8.61741C4.27269 8.97893 3.97964 9.27194 3.61815 9.27194H1.65454C1.29305 9.27194 1 8.97893 1 8.61741Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.9993 8.61741V3.3811C24.9993 3.01961 24.7062 2.72656 24.3447 2.72656H22.3811C22.0196 2.72656 21.7266 3.01961 21.7266 3.3811V8.61741C21.7266 8.97893 22.0196 9.27194 22.3811 9.27194H24.3447C24.7062 9.27194 24.9993 8.97893 24.9993 8.61741Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.63477 5.99927H17.3619"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const PracticeIcon = ({ className, size }: IconProps): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.7645 14.9717V6.07723C23.7645 5.85083 23.6746 5.6337 23.5145 5.47359L19.0347 0.993936C18.8747 0.83383 18.6576 0.743896 18.4312 0.743896H1.85367C1.3822 0.743896 1 1.1261 1 1.59756V28.3458C1 28.8173 1.3822 29.1995 1.85367 29.1995H10.9595"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.69141 12.1262H18.0737M6.69141 6.43506H12.3825M6.69141 17.8173H10.9597"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.8542 21.9994L22.2769 20.5767C22.9 19.9536 23.9102 19.9536 24.5332 20.5767C25.1562 21.1997 25.1562 22.2099 24.5332 22.8329L23.1104 24.2557M20.8542 21.9994L16.5985 26.2551C16.3852 26.4684 16.2452 26.744 16.1988 27.0419L15.8535 29.2563L18.0678 28.9112C18.3659 28.8646 18.6413 28.7246 18.8546 28.5114L23.1104 24.2557M20.8542 21.9994L23.1104 24.2557"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0723 0.743896V5.58135C18.0723 6.05282 18.4544 6.43502 18.9259 6.43502H23.7634"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const SummaryIcon = ({ className, size }: IconProps): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 30.1V1.9C1 1.40294 1.40294 1 1.9 1H19.3772C19.6159 1 19.8448 1.09482 20.0135 1.26361L24.7365 5.98639C24.9052 6.15519 25 6.3841 25 6.62279V30.1C25 30.5971 24.5971 31 24.1 31H1.9C1.40294 31 1 30.5971 1 30.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13.0002H19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 25.0005H19"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 18.9998H13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 1V6.1C19 6.59706 19.4029 7 19.9 7H25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const AssignmentIcon = ({ className, size }: IconProps): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 28.8572V4.0001C1 2.10656 2.53502 0.571533 4.42857 0.571533H23.9714C24.5395 0.571533 25 1.03204 25 1.6001V31.4287"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M7.85742 7.4292H18.1431"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M3.57227 21.1433H25.0008"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M3.57227 26.2854H25.0008"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M3.57227 31.4287H25.0008"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M3.57143 26.2862C1.85714 26.2862 1 25.1349 1 23.7147C1 22.2946 1.85714 21.1433 3.57143 21.1433"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.57143 31.4283C1.85714 31.4283 1 30.2769 1 28.8568C1 27.4367 1.85714 26.2854 3.57143 26.2854"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const NoteIcon = ({ className, size }: IconProps): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.7645 14.9717V6.07723C23.7645 5.85082 23.6746 5.63369 23.5145 5.47359L19.0347 0.993936C18.8747 0.83383 18.6576 0.743896 18.4312 0.743896H1.85367C1.3822 0.743896 1 1.1261 1 1.59756V28.3458C1 28.8173 1.3822 29.1995 1.85367 29.1995H10.9595"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.69141 12.1262H18.0737M6.69141 6.43506H12.3825M6.69141 17.8173H10.9597"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.8542 21.9994L22.2769 20.5767C22.9 19.9536 23.9102 19.9536 24.5332 20.5767C25.1562 21.1997 25.1562 22.2099 24.5332 22.8329L23.1104 24.2557M20.8542 21.9994L16.5985 26.2551C16.3852 26.4684 16.2452 26.744 16.1988 27.0419L15.8535 29.2563L18.0678 28.9112C18.3659 28.8646 18.6413 28.7246 18.8546 28.5114L23.1104 24.2557M20.8542 21.9994L23.1104 24.2557"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0723 0.743896V5.58135C18.0723 6.05282 18.4544 6.43502 18.9259 6.43502H23.7634"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const ExamIcon = ({ className, size }: IconProps): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M22.3333 13.9998V5.66454C22.3333 5.45237 22.2491 5.24889 22.0991 5.09885L17.9009 0.900824C17.7509 0.750784 17.5475 0.666504 17.3353 0.666504H1.8C1.35817 0.666504 1 1.02468 1 1.4665V26.5332C1 26.975 1.35817 27.3332 1.8 27.3332H10.3333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.33203 11.3328H16.9987M6.33203 5.99951H11.6654M6.33203 16.6662H10.332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 25.3335L25 27.3335"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.668 22C15.668 24.2092 17.4588 26 19.668 26C20.7745 26 21.776 25.5507 22.5001 24.8247C23.2218 24.1011 23.668 23.1027 23.668 22C23.668 19.7908 21.8772 18 19.668 18C17.4588 18 15.668 19.7908 15.668 22Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 0.666504V5.19984C17 5.64166 17.3581 5.99984 17.8 5.99984H22.3333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const PresentationIcon = ({
  className,
  size,
}: IconProps): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.084 30.5832L16.334 25.3333L21.584 30.5832M16.334 1.33325V4.33325M11.834 16.3333V19.3333M16.334 13.3333V19.3333M20.834 10.3333V19.3333M31.334 5.23325V24.4332C31.334 24.5514 31.3107 24.6685 31.2655 24.7777C31.2202 24.8869 31.154 24.9861 31.0704 25.0696C30.9868 25.1532 30.8876 25.2195 30.7784 25.2647C30.6692 25.31 30.5522 25.3333 30.434 25.3333H2.23398C1.99529 25.3333 1.76637 25.2384 1.59759 25.0696C1.42881 24.9009 1.33398 24.6719 1.33398 24.4332V5.23325C1.33398 4.99456 1.42881 4.76564 1.59759 4.59686C1.76637 4.42807 1.99529 4.33325 2.23398 4.33325H30.434C30.6727 4.33325 30.9016 4.42807 31.0704 4.59686C31.2392 4.76564 31.334 4.99456 31.334 5.23325Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const OtherIcon = ({ className, size }: IconProps): JSX.Element => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 26 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 30.1V1.9C1 1.66131 1.09482 1.43239 1.2636 1.2636C1.43239 1.09482 1.66131 1 1.9 1H19.378C19.6166 1.00021 19.8454 1.09517 20.014 1.264L24.736 5.986C24.82 6.06985 24.8865 6.16947 24.9318 6.27914C24.9771 6.3888 25.0003 6.50634 25 6.625V30.1C25 30.2182 24.9767 30.3352 24.9315 30.4444C24.8863 30.5536 24.82 30.6528 24.7364 30.7364C24.6528 30.82 24.5536 30.8863 24.4444 30.9315C24.3352 30.9767 24.2182 31 24.1 31H1.9C1.78181 31 1.66478 30.9767 1.55558 30.9315C1.44639 30.8863 1.34718 30.82 1.2636 30.7364C1.18003 30.6528 1.11374 30.5536 1.06851 30.4444C1.02328 30.3352 1 30.2182 1 30.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 1V6.1C19 6.33869 19.0948 6.56761 19.2636 6.7364C19.4324 6.90518 19.6613 7 19.9 7H25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
