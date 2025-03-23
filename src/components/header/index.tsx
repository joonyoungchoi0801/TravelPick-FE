function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-center w-full h-[60px] border-b border-[color:var(--color-gray)] px-[calc((100vw-80rem)/2)]">
      <div className="flex items-center justify-between w-full ">
        <div className="flex items-center">TRAVELPICK</div>
        <div className="flex items-center gap-[1rem]">
          <button className="inline-block px-4 py-2 hover:bg-gray-200 rounded text-[1rem]">
            아시아
          </button>
          <button className="px-4 py-2 hover:bg-gray-200 rounded">유럽</button>
          <button className="px-4 py-2 hover:bg-gray-200 rounded">
            아메리카
          </button>
          <button className="px-4 py-2 hover:bg-gray-200 rounded">
            아프리카
          </button>
        </div>
        <button className="flex items-center">로그인</button>
      </div>
    </header>
  );
}

export default Header;
