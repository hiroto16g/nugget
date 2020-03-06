<template>
    <div class="search">
        <div class="search-wrapper">
            <InputBar placeholder="検索" @input="inputSearchBar"></InputBar>
            <div class="tags">
                <div v-for="(name, i) in choicedTags" :key="i" class="tag">
                    <Chip :name="name"></Chip>
                </div>
            </div>
            <div class="no-tags" v-show="!choicedTags.length">
                タグが選択されていません
            </div>
        </div>
        <div class="thumbnail-wrapper">
            <div class="recommend">
                <div class="category">おすすめ</div>
                <div class="thumbnails">
                    <div v-for="(t, i) in recommendSrc" :key="i" class="item">
                        <Thumbnail :src="t.src" :title="t.title" :id="t.id"></Thumbnail>
                    </div>
                </div>
            </div>
            <div class="popular">
                <div class="category">人気</div>
                <div class="thumbnails">
                    <div v-for="(t, i) in popularSrc" :key="i" class="item">
                        <Thumbnail :src="t.src" :title="t.title" :id="t.id"></Thumbnail>
                    </div>
                </div>
            </div>
            <div class="trending">
                <div class="category">急上昇</div>
                <div class="thumbnails">
                    <div v-for="(t, i) in trendingSrc" :key="i" class="item">
                        <Thumbnail :src="t.src" :title="t.title" :id="t.id"></Thumbnail>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .search-wrapper {
        height: 60px;
        padding: 15px 0;
        background-color: #FAFAFA;
        border-bottom: solid thin #ccc;

        .input-bar {
            width: 310px;
            margin-left: 3vw;
        }

        .tags {
            margin: 8px 0 0;
            overflow-x: scroll;
            display: flex;

            .tag {
                margin: 0 2px;
                display: inline-block;

                &:first-child {
                    margin-left: calc(3vw - 2px);
                }
            }
        }

        .no-tags {
            margin: 5px 0 0 3vw;
            font-size: 12px;
            color: #888;
        }

    }
    
    .thumbnail-wrapper {
        
        > div {
            margin-top: 20px;
            
            .category {
                margin-left: 3vw;
                margin-bottom: 5px;
            }
        }
    }

</style>

<script src="js/vue.js"></script>
<script>
    import Thumbnail from '@/components/Thumbnail.vue'
    import InputBar from '@/components/InputBar.vue'
    import Chip from '@/components/Chip.vue'
    import axios from 'axios'

    export default {
        name: 'search',
        components: {
            Thumbnail,
            InputBar,
            Chip
        },
        data() {
            return {
                choicedTags: [
                ],
                recommendSrc: [
                ],
                popularSrc: [
                ],
                trendingSrc: [
                ],
            }
        },
        methods:{
            inputSearchBar:function(value){
                var self = this;

                var formData = new FormData();
                formData.append('Keyword',value);
                formData.append('Filter', '3');//1:一日、2：一週間、3:一か月以内の視聴でフィルター
                
                axios
                .post('http://localhost:8080/search-tag', formData)
                .then(function (response) {
                    self.choicedTags = [];
                    response.data.list.forEach(function(tag){
                        self.choicedTags.push(tag.tag);
                    });
                });
            }
        },
        mounted () {
            var self = this;

            //仮データ
            var formData = new FormData();
            formData.append('ContentId', '1');
            formData.append('UserId', 'test1');

            //おすすめ取得
            axios
            .post('http://localhost:8080/get-user-recommend', formData)
            .then(function (response) {
                response.data.forEach(function(tmpContent){
                    self.recommendSrc.push({
                        src:tmpContent.thumbnailpath,
                        title:tmpContent.title,
                        id:String(tmpContent.contentid),
                    });
                });
            });

            //人気取得
            axios
            .post('http://localhost:8080/get-popular', formData)
            .then(function (response) {
                response.data.forEach(function(tmpContent){
                    self.popularSrc.push({
                        src:tmpContent.thumbnailpath, 
                        title:tmpContent.title,
                        id:String(tmpContent.contentid),
                    });
                });
            });

            //急上昇取得
            axios
            .post('http://localhost:8080/get-rapid-rise', formData)
            .then(function (response) {
                response.data.forEach(function(tmpContent){
                    self.trendingSrc.push({
                        src:tmpContent.thumbnailpath, 
                        title:tmpContent.title,
                        id:String(tmpContent.contentid),
                    });
                });
            });
        },
    }

</script>
