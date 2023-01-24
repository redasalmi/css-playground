import * as React from 'react';

const animationsTypes = {
  showFromTop: 'open:animate-show-from-top',
  showfromBottom: 'open:animate-show-from-bottom',
  showfromCenter: 'open:animate-show-from-center',
  hideToTop: 'animate-hide-to-top',
  hideToBottom: 'animate-hide-to-bottom',
  hideToCenter: 'animate-hide-to-center',
} as const;

const {
  showFromTop,
  showfromBottom,
  showfromCenter,
  hideToTop,
  hideToBottom,
  hideToCenter,
} = animationsTypes;

type AnimationKeys = keyof typeof animationsTypes;
type Animation = typeof animationsTypes[AnimationKeys];

const isAnimation = (animation: any): animation is Animation => {
  return Object.values(animationsTypes).includes(animation);
};

const animationsOptions = [
  { value: showFromTop, label: 'Show Dialog from Top' },
  { value: showfromBottom, label: 'Show Dialog from Bottom' },
  { value: showfromCenter, label: 'Show Dialog from Center' },
];

export default function DialogElementRoute() {
  const dialogRef = React.useRef<HTMLDialogElement>(null!);
  const dialogContentRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    let closeTimer: NodeJS.Timeout;

    const clickOutside = (event: MouseEvent) => {
      const { target } = event;

      if (
        dialogRef.current.open &&
        target instanceof Node &&
        !dialogContentRef.current.contains(target)
      ) {
        if (dialogRef.current.classList.contains(showFromTop)) {
          updateDialogAnimation(hideToTop);
        } else if (dialogRef.current.classList.contains(showfromBottom)) {
          updateDialogAnimation(hideToBottom);
        } else if (dialogRef.current.classList.contains(showfromCenter)) {
          updateDialogAnimation(hideToCenter);
        }

        closeTimer = setTimeout(() => {
          dialogRef.current.close();
          document.body.style.overflow = 'initial';
        }, 600);
      }
    };

    document.body.addEventListener('click', clickOutside);

    return () => {
      document.body.removeEventListener('click', clickOutside);
      clearTimeout(closeTimer);
    };
  }, []);

  const openDialog = () => {
    document.body.style.overflow = 'hidden';

    if (dialogRef.current.classList.contains(hideToTop)) {
      updateDialogAnimation(showFromTop);
    } else if (dialogRef.current.classList.contains(hideToBottom)) {
      updateDialogAnimation(showfromBottom);
    } else if (dialogRef.current.classList.contains(hideToCenter)) {
      updateDialogAnimation(showfromCenter);
    }

    dialogRef.current.showModal();
  };

  const updateDialogAnimation = (animation: Animation) => {
    dialogRef.current.classList.remove(...Object.values(animationsTypes));
    dialogRef.current.classList.add(animation);
  };

  const handleAnimationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const animation = event.target.value;
    if (isAnimation(animation)) {
      updateDialogAnimation(animation);
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={() => openDialog()}
        className="h-10 rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        Open Dialog
      </button>
      <select
        className="ml-4 h-10 rounded-md px-4 py-2"
        onChange={handleAnimationChange}
      >
        {animationsOptions.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <dialog
        ref={dialogRef}
        className={`absolute inset-0 m-auto h-96 w-96 rounded-md p-0 shadow backdrop:bg-gray-400 backdrop:bg-opacity-70 ${animationsOptions[0].value}`}
      >
        <div ref={dialogContentRef} className="h-full p-2" />
      </dialog>
    </div>
  );
}
