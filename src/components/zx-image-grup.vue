<template>


<div class="zx-water-fall">
    <el-card v-for="item in arts" :key="item">
        <el-image :src="item.src"
            class="image" :preview-src-list="artssrc" 
            loading="lazy"/>
        <div style="padding: 14px">
            <span>Delicious hamburger</span>
            <div class="bottom card-header">
                <div class="time">{{ currentDate }}</div>
                <el-button text class="button">operation button</el-button>
            </div>
        </div>
    </el-card>

</div>


</template>

<script>
import { ElImage } from 'element-plus'



export default {
    data() {
        return {
            loading: false,
        }
    },
    props: {
        arts: {
            type: Object
        },
        artssrc: {
            type: Object
        }
    },
    components: {
        // ElSkeleton,
        ElImage
    }
}


</script>

<style>
</style>