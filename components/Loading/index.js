const Loading = () => {
  return (
    <div className="flex flex-col justify-center h-full">
      <svg
        className="animate-spin h-12 w-12 m-auto text-black"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="84"
        height="84"
        viewBox="0 0 172 172"
        // style=" fill:#000000;"
      >
        <g
          fill="none"
          fill-rule="nonzero"
          stroke="none"
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          stroke-miterlimit="10"
          stroke-dasharray=""
          stroke-dashoffset="0"
          font-family="none"
          font-weight="none"
          font-size="none"
          text-anchor="none"
          // style="mix-blend-mode: normal"
        >
          <path d="M0,172v-172h172v172z" fill="none"></path>
          <g fill="#000000">
            <path d="M29.16117,78.83333c3.5475,-28.23667 27.65617,-50.16667 56.83883,-50.16667c29.18267,0 53.29133,21.93 56.83883,50.16667h14.4695c-3.612,-36.163 -34.21367,-64.5 -71.30833,-64.5c-37.09467,0 -67.69633,28.337 -71.30117,64.5zM40.764,121.10233c-6.149,-7.92633 -10.29133,-17.49383 -11.60283,-27.93567h-14.46233c1.43333,14.39067 7.19533,27.4985 15.8885,38.11233zM74.7985,142.1795c-8.86517,-1.77733 -17.0065,-5.58283 -23.89367,-10.95067l-10.18383,10.18383c9.35967,7.66117 20.6615,13.02183 33.05267,15.18617zM108.43167,138.68217c-5.99133,2.5585 -12.50583,4.13517 -19.33567,4.50783l-1.02483,14.37633c9.83267,-0.2795 19.14217,-2.60867 27.59883,-6.4715zM130.94933,121.33167c-2.967,3.7625 -6.34967,7.18817 -10.148,10.105l7.25267,12.427c5.8265,-4.2355 10.97217,-9.34533 15.29367,-15.10017z"></path>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Loading;
