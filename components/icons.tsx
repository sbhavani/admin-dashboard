export function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function Spinner() {
  return (
    <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
}

export function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="text-gray-100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="100%" rx="16" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="black"
      />
    </svg>
  );
}

export function VercelLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      data-v-fde0c5aa="" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 300 300" 
      className="icon"
    >
      <defs data-v-fde0c5aa=""></defs>
      <rect 
        data-v-fde0c5aa="" 
        fill="transparent" 
        x="0" 
        y="0" 
        width="300px" 
        height="300px" 
        className="logo-background-square"
      />
      <defs data-v-fde0c5aa="">
        <linearGradient 
          data-v-fde0c5aa="" 
          gradientTransform="rotate(25)" 
          id="6acdf8c3-9497-4f07-89cd-ffedc7a8abf2" 
          x1="0%" 
          y1="0%" 
          x2="100%" 
          y2="0%"
        >
          <stop 
            data-v-fde0c5aa="" 
            offset="0%" 
            stopColor="#41E296" 
            stopOpacity="1"
          />
          <stop 
            data-v-fde0c5aa="" 
            offset="100%" 
            stopColor="#00C4EE" 
            stopOpacity="1"
          />
        </linearGradient>
      </defs>
      <g 
        data-v-fde0c5aa="" 
        id="70162973-e494-4337-a12a-2402c6116b32" 
        fill="url(#6acdf8c3-9497-4f07-89cd-ffedc7a8abf2)" 
        stroke="none" 
        transform="matrix(2.607716536130902,0,0,2.607716536130902,20.322159817303277,17.47976082957606)"
      >
        <path 
          d="M13.572 36.355a3.616 3.616 0 0 0-3.615 3.616v21.694a3.614 3.614 0 0 0 3.615 3.615 3.615 3.615 0 0 0 3.616-3.615V39.971a3.617 3.617 0 0 0-3.616-3.616zm12.053-15.667a3.615 3.615 0 0 0-3.615 3.616v53.029a3.614 3.614 0 0 0 3.615 3.615 3.615 3.615 0 0 0 3.616-3.615V24.304a3.617 3.617 0 0 0-3.616-3.616zM37.677 8.636a3.616 3.616 0 0 0-3.616 3.616v77.133a3.615 3.615 0 0 0 7.232 0V12.252a3.617 3.617 0 0 0-3.616-3.616zm12.052 21.092a3.616 3.616 0 0 0-3.616 3.615v34.951a3.615 3.615 0 0 0 7.231 0V33.343a3.616 3.616 0 0 0-3.615-3.615zM61.78 8.636a3.616 3.616 0 0 0-3.615 3.616v77.133a3.615 3.615 0 0 0 7.23 0V12.252a3.615 3.615 0 0 0-3.615-3.616zm12.053 18.078a3.616 3.616 0 0 0-3.615 3.616v40.976a3.616 3.616 0 1 0 7.23 0V30.33a3.617 3.617 0 0 0-3.615-3.616zm12.052 10.244a3.617 3.617 0 0 0-3.616 3.616v20.489a3.616 3.616 0 0 0 7.231-.001V40.574a3.617 3.617 0 0 0-3.615-3.616"
        />
      </g>
    </svg>
  );
}
