import SkeletonButton from 'antd/es/skeleton/Button';

export default function Loading() {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-3'>
        <SkeletonButton active className='!w-[300px]' />
        <SkeletonButton active className='!w-[300px]' />
      </div>

      <SkeletonButton active className='!h-[670px] !w-full' />

      <div className='flex items-center justify-end gap-3'>
        <SkeletonButton active className='!w-[90px]' />
        <SkeletonButton active className='!w-[300px]' />
      </div>
    </section>
  );
}
