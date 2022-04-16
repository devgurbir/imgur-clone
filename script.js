console.log('Helo')

window.addEventListener('load', async () => {
    let tags = await fetch(`https://api.imgur.com/3/tags`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Authorization': `Client-ID 730ab19eb3ef4b9`
        }
    });
    tags = await tags.json();
    console.log(tags)

    trendingTagsHeader();
    
    // let moreTagsSpan = document.querySelector('.moreTags')
    let tagsToggle = document.querySelector('.moreTags')
    
    tagsToggle.addEventListener('click', () => addMoreTags(tags))


    let trendingTagsContent = document.createElement('div');
    trendingTagsContent.setAttribute('class', 'trendingTagsContent')

    for(let i = 0; i<11; i++){
        let el = tags.data.tags[i];
        let tagEl = trendingTagSingle(el.display_name, el.background_hash, el.total_items);
        trendingTagsContent.appendChild(tagEl);
    }

    const trendingTagsSection = document.querySelector('.trendingTags')
    trendingTagsSection.appendChild(trendingTagsContent)


})

let addMoreTags = (tags) => {
        
        let tagsToggle = document.querySelector('.moreTags')
    
        let trendingTagsContent = document.querySelector('.trendingTagsContent');
        for(let i = 12; i<=33; i++){
            let el = tags.data.tags[i];
            let tagEl = trendingTagSingle(el.display_name, el.background_hash, el.total_items);
            trendingTagsContent.appendChild(tagEl);
    
            tagsToggle.textContent = 'LESS TAGS x';

            tagsToggle.addEventListener('click', () => lessTags(tags))


        }
    
}

function lessTags(tags){
    let trendingTagsContent = document.querySelector('.trendingTagsContent');
    let tagsToggle = document.querySelector('.moreTags')
        let allSingleTags = document.querySelectorAll('.single-tag');
        allSingleTags.forEach((v, i) => {
            if(i >= 11){
                trendingTagsContent.removeChild(v)
            }
        })
        tagsToggle.textContent = 'MORE TAGS +';
        tagsToggle.addEventListener('click', () => addMoreTags(tags))

}

function trendingTagsHeader(){
    // header
    const trendingTagsSection = document.querySelector('.trendingTags')
    const trendingTagsHeader = document.createElement('div');
    trendingTagsHeader.setAttribute('class', 'trendingTagsHeader')
    
    let exploreTagsSpan = document.createElement('span');
    exploreTagsSpan.textContent = 'EXPLORE TAGS';

    let moreTagsSpan = document.createElement('span');
    moreTagsSpan.setAttribute('class', 'moreTags')
    moreTagsSpan.textContent = 'MORE TAGS +';

    trendingTagsHeader.appendChild(exploreTagsSpan)
    trendingTagsHeader.appendChild(moreTagsSpan)

    

    trendingTagsSection.appendChild(trendingTagsHeader)
}

function trendingTagSingle(text, backgroundHash, postNumber){
    let wrapper = document.createElement('div');
    wrapper.style.backgroundImage = `url("https://via.placeholder.com/150/e48f32")`;
    
    wrapper.setAttribute('class', 'single-tag');
    
    let tagInfo= document.createElement('div');
    tagInfo.setAttribute('class', 'tagInfo')
    let tagTitle = document.createElement('span');
    let tagPosts = document.createElement('span');

    tagTitle.textContent = text;
    tagTitle.setAttribute('class', "tagTitle")
    tagPosts.textContent = `${postNumber} posts`
    tagPosts.setAttribute('class', "tagPosts")

    tagInfo.append(tagTitle, tagPosts)

    wrapper.appendChild(tagInfo)
    return wrapper
}
