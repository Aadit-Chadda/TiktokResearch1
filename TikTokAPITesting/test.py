from TikTokApi import TikTokApi
import asyncio
import os

token = "tx4NbRDwNurIulKFMLO15Hs2zRytH5wrRrAmfNqX5Xy4_wBhFQuUf3cQJcnaTo-U1JIhAGERfEl3RFPW2PbZyKR3bhJPLOpMb07t5hQZX6y_IIfaFs2JdbW3hPET3V3Zws9th3C5Ib0yvy2fgegudAc="
ms_token = os.environ.get(token, None)


async def trending_videos():
    async with TikTokApi() as api:
        await api.create_sessions(ms_tokens=[ms_token], num_sessions=1, sleep_after=3)
        async for video in api.trending.videos(count=30):
            print(video)


if __name__ == "__main__":
    asyncio.run(trending_videos())
