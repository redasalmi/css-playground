import * as React from 'react';

const animationsTypes = {
  showFromTop: 'open:animate-show-from-top',
  showfromBottom: 'open:animate-show-from-bottom',
  showfromCenter: 'open:animate-show-from-center',
} as const;

type animation =
  | typeof showFromTop
  | typeof showfromBottom
  | typeof showfromCenter;

const { showFromTop, showfromBottom, showfromCenter } = animationsTypes;
const animationsOptions = [
  { value: showFromTop, label: 'Show Dialog from Top' },
  { value: showfromBottom, label: 'Show Dialog from Bottom' },
  { value: showfromCenter, label: 'Show Dialog from Center' },
];

export default function DialogElementRoute() {
  const dialogRef = React.useRef<HTMLDialogElement>(null!);
  const dialogContentRef = React.useRef<HTMLDivElement>(null!);
  const [dialogAnimation, setDialogAnimation] =
    React.useState<animation>(showFromTop);

  React.useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const { target } = event;
      if (target && target instanceof Node) {
        if (!dialogContentRef.current.contains(target)) {
          closeDialog();
        }

        return;
      }

      closeDialog();
    };

    document.body.addEventListener('click', clickOutside);

    return () => {
      document.body.removeEventListener('click', clickOutside);
    };
  }, []);

  const openDialog = () => dialogRef.current.showModal();
  const closeDialog = () => dialogRef.current.close();

  const handleAnimationChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (
      event.target.value === showFromTop ||
      event.target.value === showfromBottom ||
      event.target.value === showfromCenter
    ) {
      setDialogAnimation(event.target.value);
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
        className={`absolute inset-0 m-auto h-96 w-96 rounded-md p-0 shadow backdrop:bg-gray-400 backdrop:bg-opacity-70 ${dialogAnimation}`}
      >
        <div ref={dialogContentRef} className="h-full p-2" />
      </dialog>
    </div>
  );
}
