const xss = require('xss')
const { exec, escape } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `

    if (author) {
        sql += `and author='${author}'`
    }

    if (keyword) {
        sql += `and title like '%${keyword}%'`
    }

    sql += `order by createtime desc;`

    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select title, content, createtime, author from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {

    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = xss(blogData.author)
    const createTime = Date.now()

    let sql = `insert into blogs (title, content, createtime, author) 
               values ('${title}', '${content}', ${createTime}, '${author}');`

    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {

    const title = blogData.title
    const content = blogData.content
    const author = blogData.author

    let sql = `update blogs set title='${title}', content='${content}' where id=${id};`

    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const delBlog = (id, author) => {
    let sql = `delete from blogs where id=${id} and author='${author}';`

    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}